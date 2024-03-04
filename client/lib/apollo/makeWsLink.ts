import { GraphQLError, print } from "graphql";
import { Client, createClient } from "graphql-ws";

import { ApolloLink, FetchResult, Observable, Operation } from "@apollo/client";
import AuthToken from "@lib/AuthToken";
// @ts-ignore (type for v16 is not available yet)

let wsClient: Client | null = null;
let _rootURL: string | null = null;

export class WebSocketLink extends ApolloLink {
  public request(operation: Operation): Observable<FetchResult> {
    return new Observable((sink) => {
      if (!wsClient) {
        sink.error(new Error("No websocket connection"));
        return;
      }
      return wsClient.subscribe<FetchResult>(
        { ...operation, query: print(operation.query) },
        {
          next: sink.next.bind(sink),
          complete: sink.complete.bind(sink),
          error: (err) => {
            if (err instanceof Error) {
              sink.error(err);
            } else if (err instanceof CloseEvent) {
              sink.error(
                new Error(
                  `Socket closed with event ${err.code}` + err.reason
                    ? `: ${err.reason}` // reason will be available on clean closes
                    : ""
                )
              );
            } else {
              sink.error(
                new Error(
                  (err as GraphQLError[])
                    .map(({ message }) => message)
                    .join(", ")
                )
              );
            }
          },
        }
      );
    });
  }
}

function createWsClient() {
  if (!_rootURL) {
    throw new Error("No ROOT_URL");
  }
  const url = `${_rootURL.replace(/^http/, "ws")}/graphql`;
  return createClient({
    url,
    connectionParams: async () => {
      const token = AuthToken.get();
      return {
        Authorization: `Bearer ${token}`,
      };
    },
  });
}

export function resetWebsocketConnection(): void {
  if (wsClient) {
    wsClient.dispose();
  }
  wsClient = createWsClient();
}

export default function makeWsLink(ROOT_URL: string) {
  if (_rootURL) {
    throw new Error("Must only makeWsLink once");
  }
  _rootURL = ROOT_URL;

  wsClient = createWsClient();
  return new WebSocketLink();
}
