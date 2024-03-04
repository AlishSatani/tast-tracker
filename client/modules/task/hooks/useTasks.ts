import { useTasksQuery } from "@graphql";
import { usePagination } from "@lib/hooks";
import { debounce, omit } from "lodash";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

export const useTasks = () => {

  const router = useRouter();

  const [keyword, setKeyword] = useState(router?.query?.keyword);

  const { data, loading, refetch, goNext, goPrev, currentPage } = usePagination(
    useTasksQuery,
    null,
    10,
    true
  );

  const pageInfo = {
    ...data?.tasks?.pageInfo,
    currentPage,
  };

  const handleSearch = (value: any) => {
    setKeyword(value?.target?.value);
    const params = value?.target?.value
      ? {
        ...router?.query,
        keyword: value?.target?.value,
      }
      : { ...omit(router?.query, "keyword") };
    router?.push({
      query: { ...params, page: 1 },
    });
  };

  const defaultOffset = {
    offset: 0,
  };

  const onSearch = useCallback(
    debounce((keyword?: string) => {
      refetch({
        ...defaultOffset,
        keyword: keyword,
      });
    }, 500),
    []
  );
  useEffect(() => {
    onSearch(router?.query?.keyword as string);
  }, [router?.query?.keyword]);

  return {
    loading,
    tasks: data?.tasks?.nodes,
    refetch,
    goNext,
    goPrev,
    currentPage,
    pageInfo,
    handleSearch,
    keyword,
  };
}