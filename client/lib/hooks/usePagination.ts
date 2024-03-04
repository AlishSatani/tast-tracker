import { QueryHookOptions } from "@apollo/client";
import { merge } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const usePagination = (
  useQueryHook: Function,
  queryHookOptions?: QueryHookOptions<any> | null,
  pageLimit?: number,
  enableUrlRouting?: boolean
) => {
  const router = useRouter();
  const queryParams = router.query;
  const limit = pageLimit || 15;
  const paginationPayload = {
    variables: {
      first: limit,
      offset: 0,
    },
  };
  const { data, loading, refetch, ...hookResult } = useQueryHook(
    merge(paginationPayload, queryHookOptions)
  );
  const [currentPage, setCurrentPage] = useState(1);
  const goNext = () =>
    enableUrlRouting
      ? router.push({ query: { ...queryParams, page: currentPage + 1 } })
      : setCurrentPage(currentPage + 1);
  const goPrev = () => {
    if (currentPage > 1)
      enableUrlRouting
        ? router.push({ query: { ...queryParams, page: currentPage - 1 } })
        : setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    if (router.query.page) {
      const queryPage = router.query.page as string;
      const pageNumber: number = +queryPage;
      setCurrentPage(pageNumber);
    }
  }, [router.query.page]);

  useEffect(() => {
    refetch({
      offset: (currentPage - 1) * limit,
    });
  }, [currentPage, refetch, limit]);
  return {
    data,
    loading,
    currentPage,
    setCurrentPage,
    refetch,
    goNext,
    goPrev,
    ...hookResult,
  };
};
