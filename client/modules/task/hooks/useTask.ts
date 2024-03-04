import { useTaskQuery } from "@graphql";

export const useTask = (id?: string) => {
  const { data, loading, refetch } = useTaskQuery({
    variables: { id },
    skip: !id,
  });

  return {
    task: data?.task,
    refetch,
    loading,
  };
};
