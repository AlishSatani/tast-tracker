import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
// @ts-ignore (type for v16 is not available yet)
import { createUploadLink } from "apollo-upload-client";
import { getOperationAST } from "graphql";
import withApolloBase from "next-with-apollo";
import makeWsLink from "./makeWsLink";
import AuthToken from "@lib/AuthToken";
import { typePolicies } from "./cacheTypePolicy";
import { getDataFromTree } from "@apollo/client/react/ssr";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import { jwtDecode } from "jwt-decode";

let _rootURL: string | null = null;

function makeServerSideLink(ROOT_URL: string) {
  return new HttpLink({
    uri: `${ROOT_URL}/graphql`,
  });
}

function makeClientSideLink(ROOT_URL: string) {
  if (_rootURL) {
    throw new Error("Must only makeClientSideLink once.");
  }
  _rootURL = ROOT_URL;

  const httpLink = new createUploadLink({
    uri: `${ROOT_URL}/graphql`,
    credentials: "same-origin",
    headers: {},
  });
  const wsLink = makeWsLink(ROOT_URL);

  // Using the ability to split links, you can send data to each link
  // depending on what kind of operation is being sent.
  const mainLink = split(
    // split based on operation type
    ({ query, operationName }) => {
      const op = getOperationAST(query, operationName);
      return (op && op.operation === "subscription") || false;
    },
    wsLink,
    httpLink
  );
  return mainLink;
}

export const withApollo = withApolloBase(({ initialState, ctx }) => {
  const ROOT_URL = process.env.NEXT_PUBLIC_API_URL;
  if (!ROOT_URL) {
    throw new Error("ROOT_URL envvar is not set");
  }

  const onErrorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
        console.error(
          `[GraphQL error]: message: ${message}, location: ${JSON.stringify(
            locations
          )}, path: ${JSON.stringify(path)}`
        )
      );
    if (networkError) console.error(`[Network error]: ${networkError}`);
  });
  const isServer = typeof window === "undefined";
  const mainLink = isServer
    ? makeServerSideLink(ROOT_URL)
    : makeClientSideLink(ROOT_URL);

  const authMiddleware = new ApolloLink((operation, forward) => {
    const { accessToken } = AuthToken.get(ctx);

    // add the authorization to the headers
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        Authorization: `Bearer ${accessToken || ""}`,
      },
    }));
    return forward(operation);
  });

  //! fix token refresh link

  const tokenRefresh = new TokenRefreshLink({
    accessTokenField: "accessToken",
    isTokenValidOrUndefined: () => {
      const token = AuthToken.get().accessToken;

      if (!token) return true;

      try {
        const { exp } = jwtDecode(token);

        if (Date.now() >= exp! * 1000) return false;

        return true;
      } catch (error) {
        return false;
      }
    },
    fetchAccessToken: () => {
      return fetch("http://localhost:5001/refresh_token", {
        method: "POST",
        credentials: "include",
        headers: {
          authorization: `Bearer ${AuthToken.get().refreshToken}`,
        }
      });
    },
    handleFetch: (accessToken) => {
      AuthToken.set("accessToken", accessToken);
    },
    handleError: (err) => {
      // full control over handling token fetch Error
      console.warn("Your refresh token is invalid. Try to relogin");
      console.log(err);
    },
  });

  const client = new ApolloClient({
    link: ApolloLink.from([onErrorLink, authMiddleware, mainLink]),
    cache: new InMemoryCache({
      typePolicies,
    }).restore(initialState || {}),
  });

  return client;
},
  {
    getDataFromTree,
  }
);
