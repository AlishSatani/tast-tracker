import PgManyToManyPlugin from "@graphile-contrib/pg-many-to-many";
import PgSimplifyInflectorPlugin from "@graphile-contrib/pg-simplify-inflector";
import { Express, Request, Response } from "express";
import { NodePlugin } from "graphile-build";
// @ts-ignore, not update for version
import Jwt from "jsonwebtoken";
import { resolve } from "path";
import { Pool, PoolClient } from "pg";
import { PostGraphileOptions, postgraphile } from "postgraphile";
import ConnectionFilterPlugin from "postgraphile-plugin-connection-filter";
import { makePgSmartTagsFromFilePlugin } from "postgraphile/plugins";
// @ts-ignore (type not available yet)
// @ts-ignore (type not available yet)
import PostGraphileNestedMutations from "postgraphile-plugin-nested-mutations";
// @ts-ignore (type not available yet)

import { PassportLoginPlugin, RemoveQueryQueryPlugin } from "../plugins";
import { uuidOrNull } from "../utility";
import { getAuthPgPool, getRootPgPool } from "./installDatabase";

export interface OurGraphQLContext {
  pgClient: PoolClient;
  sessionId: string | null;
  user: any;
  rootPgPool: Pool;
  login(user: any): Promise<{
    refreshToken: string;
    accessToken: string;
  }>;
  logout(): Promise<void>;
}

const TagsFilePlugin = makePgSmartTagsFromFilePlugin(
  // We're using JSONC for VSCode compatibility; also using an explicit file
  // path keeps the tests happy.
  resolve(__dirname, "../../postgraphile.tags.jsonc")
);

const isDev = process.env.NODE_ENV === "development";

const getGraphileOptions = ({
  rootPgPool,
}): PostGraphileOptions<Request, Response> => {
  return {
    appendPlugins: [
      RemoveQueryQueryPlugin,
      TagsFilePlugin,
      PgSimplifyInflectorPlugin,
      PassportLoginPlugin,

      ConnectionFilterPlugin,
      PostGraphileNestedMutations,
      PgManyToManyPlugin,
    ],
    skipPlugins: [NodePlugin],
    async pgSettings(req) {
      // @ts-ignore
      const sessionId = uuidOrNull(req.user?.session_id);
      if (sessionId) {
        // Update the last_active timestamp (but only do it at most once every 15 seconds to avoid too much churn).
        await rootPgPool.query(
          "UPDATE app_private.sessions SET last_active = NOW() WHERE uuid = $1 AND last_active < NOW() - INTERVAL '15 seconds'",
          [sessionId]
        );
      }
      return {
        // Everyone uses the "visitor" role currently
        role: process.env.DATABASE_VISITOR,

        /*
         * Note, though this says "jwt" it's not actually anything to do with
         * JWTs, we just know it's a safe namespace to use, and it means you
         * can use JWTs too, if you like, and they'll use the same settings
         * names reducing the amount of code you need to write.
         */
        "jwt.claims.session_id": sessionId,
      };
    },
    async additionalGraphQLContextFromRequest(
      req
    ): Promise<Partial<OurGraphQLContext>> {
      return {
        // The current session id
        // @ts-ignore
        sessionId: uuidOrNull(req.user?.session_id),
        login(session) {
          const accessToken = Jwt.sign(session, process.env.JWT_SECRET || "", {
            issuer: process.env.ROOT_URL,
            expiresIn: "5h",
          });

          const refreshToken = Jwt.sign(session, process.env.JWT_SECRET || "", {
            issuer: process.env.ROOT_URL,
            expiresIn: "3d",
          });

          return Promise.resolve({
            accessToken,
            refreshToken,
          });
        },
        logout() {
          // nothing to do here for now
          return Promise.resolve();
        },
        // Needed so passport can write to the database
        rootPgPool,
      };
    },
    graphileBuildOptions: {
      // Makes all SQL function arguments except those with defaults non-nullable
      pgStrictFunctions: true,
      // nestedMutations
      nestedMutationsSimpleFieldNames: true,
      // nestedMutationsOldUniqueFields: false,

      // Connection Filters Plugin
      connectionFilterAllowedOperators: [
        "isNull",
        "equalTo",
        "notEqualTo",
        "distinctFrom",
        "notDistinctFrom",
        "lessThan",
        "lessThanOrEqualTo",
        "greaterThan",
        "greaterThanOrEqualTo",
        "in",
        "notIn",
        "includesInsensitive",
      ],

      // connectionFilterAllowedFieldTypes: ["String", "Int", "Boolean", "Uuid"],

      // connectionFilterArrays: false, // default: true

      // connectionFilterComputedColumns: false, // default: true

      connectionFilterOperatorNames: {
        equalTo: "eq",
        notEqualTo: "ne",
      },

      connectionFilterRelations: true, // default: false

      // connectionFilterSetofFunctions: false, // default: true

      // connectionFilterLogicalOperators: false, // default: true

      connectionFilterAllowNullInput: true, // default: false

      connectionFilterAllowEmptyObjectInput: true, // default: false
      uploadFieldDefinitions: [],
      derivedFieldDefinitions: [],
    },
    watchPg: isDev,
    graphiql: isDev || !!process.env.ENABLE_GRAPHIQL,
    enhanceGraphiql: true,
    subscriptions: true,
    dynamicJson: true,
    setofFunctionsContainNulls: false,
    ignoreRBAC: false,
    ignoreIndexes: false,
    showErrorStack: "json",
    extendedErrors: ["hint", "detail", "errcode"],
    allowExplain: isDev,
    legacyRelations: "omit",
    exportGqlSchemaPath: `${__dirname}/../../data/schema.graphql`,
    sortExport: true,
    disableQueryLog: true,
  };
};

const installGraphile = (app: Express) => {
  const authPgPool = getAuthPgPool(app);
  const rootPgPool = getRootPgPool(app);

  const options = getGraphileOptions({ rootPgPool });
  const middleware = postgraphile(authPgPool, "app_public", options);
  app.use(middleware);
};

export default installGraphile;
