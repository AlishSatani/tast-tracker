import { includes, uniq } from "lodash";
import { useState } from "react";
import { ContentContext } from "../ContentContext";

export const FeedProvider = ({ ...props }) => {
  const [refetchQueries, setRefetchQueries] = useState<any[]>([]);

  return (
    <ContentContext.Provider
      value={{
        refetchQueries,
        addRefetchQueries: (values: string[]) => {
          setRefetchQueries(uniq([...refetchQueries, ...values]));
        },
        removeRefetchQueries: (values: string[]) => {
          const filterFetchItems = refetchQueries?.filter(
            (i) => !includes(values, i)
          );
          setRefetchQueries(filterFetchItems);
        },
      }}
      {...props}
    />
  );
};

export default FeedProvider;
