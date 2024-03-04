import { gql, makeExtendSchemaPlugin } from "graphile-utils";

import { OurGraphQLContext } from "../middleware/installGraphile";
import { ERROR_MESSAGE_OVERRIDES } from "../utility";

const PassportLoginPlugin = makeExtendSchemaPlugin((build) => ({
  typeDefs: gql`
    input RegisterInput {
      email: String!
      password: String!
      name: String!
    }

    type RegisterPayload {
      user: User! @pgField
      accessToken: String
      refreshToken: String
    }

    input LoginInput {
      email: String!
      password: String!
    }

    type LoginPayload {
      user: User! @pgField
      accessToken: String
      refreshToken: String
    }

    type LogoutPayload {
      success: Boolean
    }

    extend type Mutation {
      """
      Use this mutation to create an account on our system. This may only be used if you are logged out.
      """
      register(input: RegisterInput!): RegisterPayload

      """
      Use this mutation to log in to your account; this login uses sessions so you do not need to take further action.
      """
      login(input: LoginInput!): LoginPayload

      """
      Use this mutation to logout from your account. Don't forget to clear the client state!
      """
      logout: LogoutPayload
    }
  `,
  resolvers: {
    Mutation: {
      async register(_, args, context: OurGraphQLContext, resolveInfo) {
        const { selectGraphQLResultFromTable } = resolveInfo.graphile;
        const { password, email, name } = args.input;
        const { rootPgPool, pgClient, login } = context;
        try {
          // Create a user and create a session for it in the proccess
          const {
            rows: [details],
          } = await rootPgPool.query(
            `
            with new_user as (
              select users.* from app_private.really_create_user(
                email => $1,
                email_is_verified => false,
                name => $2,
                password => $3
              ) users where not (users is null)
            ), new_session as (
              insert into app_private.sessions (user_id)
              select id from new_user
              returning *
            )
            select new_user.id as user_id, new_session.uuid as session_id
            from new_user, new_session`,
            [email, name, password]
          );

          if (!details || !details.user_id) {
            const e = new Error("Registration failed");
            e["code"] = "FFFFF";
            throw e;
          }

          if (details.session_id) {
            // Store into transaction
            await pgClient.query(
              `select set_config('jwt.claims.session_id', $1, true)`,
              [details.session_id]
            );
          }

          // Fetch the data that was requested from GraphQL, and return it
          const sql = build.pgSql;
          const [row] = await selectGraphQLResultFromTable(
            sql.fragment`app_public.users`,
            (tableAlias, sqlBuilder) => {
              sqlBuilder.where(
                sql.fragment`${tableAlias}.id = ${sql.value(details.user_id)}`
              );
            }
          );
          const { refreshToken, accessToken } = await login({
            session_id: details.session_id,
          });

          return {
            data: row,
            accessToken,
            refreshToken,
          };
        } catch (e: any) {
          const { code } = e;
          const safeErrorCodes = [
            "WEAKP",
            "LOCKD",
            "EMTKN",
            "MODAT",
            ...Object.keys(ERROR_MESSAGE_OVERRIDES),
          ];
          if (safeErrorCodes.includes(code)) {
            throw e;
          } else {
            console.error(
              "Unrecognised error in PassportLoginPlugin; replacing with sanitized version"
            );
            console.error(e);
            const error = new Error("Registration failed");
            error["code"] = code;
            throw error;
          }
        }
      },
      async login(_mutation, args, context: OurGraphQLContext, resolveInfo) {
        const { selectGraphQLResultFromTable } = resolveInfo.graphile;
        const { email, password } = args.input;
        const { rootPgPool, login, pgClient } = context;
        try {
          // Call our login function to find out if the email/password combination exists
          const {
            rows: [session],
          } = await rootPgPool.query(
            `select sessions.* from app_private.login($1, $2) sessions where not (sessions is null)`,
            [email, password]
          );

          if (!session) {
            const error = new Error("Incorrect email/password");
            error["code"] = "CREDS";
            throw error;
          }

          // Get session_id from PG
          await pgClient.query(
            `select set_config('jwt.claims.session_id', $1, true)`,
            [session.uuid]
          );

          // Fetch the data that was requested from GraphQL, and return it
          const sql = build.pgSql;
          const [row] = await selectGraphQLResultFromTable(
            sql.fragment`app_public.users`,
            (tableAlias, sqlBuilder) => {
              sqlBuilder.where(
                sql.fragment`${tableAlias}.id = app_public.current_user_id()`
              );
            }
          );

          // Tell Passport.js we're logged in
          const { refreshToken, accessToken } = await login({
            session_id: session.uuid,
          });

          return {
            data: row,
            accessToken,
            refreshToken,
          };
        } catch (e: any) {
          console.log("Error in login mutation", e)
          const { code } = e;
          const safeErrorCodes = ["LOCKD", "CREDS"];
          if (safeErrorCodes.includes(code)) {
            throw e;
          } else {
            console.error(e);
            const error = new Error("Login failed");
            error["code"] = e.code;
            throw error;
          }
        }
      },
      async logout(_mutation, _args, context: OurGraphQLContext, _resolveInfo) {
        const { pgClient, logout } = context;
        await pgClient.query("select app_public.logout();");
        await logout();
        return {
          success: true,
        };
      },
    },
  },
}));

export default PassportLoginPlugin;
