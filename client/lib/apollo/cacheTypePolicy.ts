import { TypePolicies } from "@apollo/client";
import { mergeCursor } from "./mergeCursor";

export const typePolicies: TypePolicies = {
  Query: {
    fields: {
      users: {
        merge: mergeCursor.merge,
        keyArgs: ["@connection", ["key"]],
      },
      conversations: {
        merge: mergeCursor.merge,
        keyArgs: ["condition", "filter"],
      },
    },
  },
  User: {
    fields: {
      notifications: {
        merge: mergeCursor.merge,
        keyArgs: false,
      },
    },
  },
  ConversationParticipants: {
    keyFields: ["postId", "conversationId"],
  },
  Conversation: {
    fields: {
      messages: {
        merge: mergeCursor.merge,
        keyArgs: ["orderBy"],
      },
      conversationParticipants: {
        merge: mergeCursor.merge,
        keyArgs: ["filter"],
      },
    },
  },
};
