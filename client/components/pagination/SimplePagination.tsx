import { PageInfo } from "@graphql";
import { IconButton } from "@material-tailwind/react";
import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface PaginationProps {
  pageInfo: Partial<PageInfo> & { currentPage?: number };
  goPrev: Function;
  goNext: Function;
}

const SimplePagination: React.FC<PaginationProps> = ({
  pageInfo,
  goPrev,
  goNext,
}) => {
  return (
    <div className="flex justify-end">
      {(pageInfo?.hasNextPage || pageInfo?.hasPreviousPage) && (
        <div className="flex gap-2 mx-2 mt-4">
          <IconButton
            onClick={() => goPrev()}
            disabled={!pageInfo?.hasPreviousPage}
            size="sm"
            className={
              pageInfo?.hasPreviousPage ? "bg-slate-700" : "bg-slate-400"
            }
          >
            <IoIosArrowBack />
          </IconButton>
          <IconButton
            onClick={() => goNext()}
            size="sm"
            disabled={!pageInfo?.hasNextPage}
            className={pageInfo?.hasNextPage ? "bg-slate-700" : "bg-slate-400"}
          >
            <IoIosArrowForward />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default SimplePagination;
