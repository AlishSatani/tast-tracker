import { FieldMergeFunction } from "@apollo/client";
import { get, head, last, uniqBy } from "lodash";

export const mergeCursor: {
  merge: FieldMergeFunction<any>;
} = {
  // issue: 1) suggested users cursor are same we needs to apply double sorting for different cursor
  //    2) follow following data duplicate and data sometime replace  merge not work
  merge(existing, incoming, { args }) {
    if (!existing || (!args?.after && !args?.before)) {
      return incoming;
    }

    const mergedEdges: any[] = get(existing, "edges", []).slice(0);

    const incomingEdges: any[] = get(incoming, "edges", []).slice(0);

    const afterIndex = mergedEdges.findIndex(
      (e: any) => args.after && e.cursor === args.after
    );

    let beforeIndex = mergedEdges.findIndex(
      (e: any) => args.before && e.cursor === args.before
    );

    let startRange = mergedEdges.length;
    let endRange = 0;
    if (beforeIndex > -1) {
      const starter = mergedEdges.findIndex(
        (e: any) =>
          head(incomingEdges)?.cursor &&
          e.cursor === head(incomingEdges)?.cursor
      );

      startRange = starter > -1 ? starter : beforeIndex;
      endRange = beforeIndex;
    } else if (afterIndex > -1) {
      const end = mergedEdges.findIndex(
        (e: any) =>
          last(incomingEdges)?.cursor &&
          e.cursor === last(incomingEdges)?.cursor
      );

      startRange = afterIndex + 1;
      endRange = end > -1 ? end : afterIndex;
    }

    mergedEdges.splice(startRange, startRange - endRange, ...incomingEdges);

    const pageInfo = {
      ...incoming?.pageInfo,
      startCursor: head(mergedEdges)?.cursor,
      endCursor: last(mergedEdges)?.cursor,
      hasNextPage: args?.before
        ? existing?.pageInfo?.hasNextPage
        : incoming?.pageInfo?.hasNextPage,
      hasPreviousPage: args?.after
        ? existing?.pageInfo?.hasPreviousPage
        : incoming?.pageInfo?.hasPreviousPage,
    };

    return {
      ...incoming,
      pageInfo,
      edges: uniqBy(mergedEdges, "cursor"),
    };
  },
};
