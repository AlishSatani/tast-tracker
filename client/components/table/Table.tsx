import React from "react";
import { Column, HeaderGroup, Row, useTable } from "react-table";
import {
  BsFillArrowUpSquareFill,
  BsFillArrowDownSquareFill,
} from "react-icons/bs";
import Loader from "@components/Loader";
import NoDataError from "@components/NoDataError";

interface sortableFieldsProps {
  field: string;
  sortOrder: string;
}

interface TableProps {
  columns: Column<any>[];
  data: Array<any>;
  sortableFields?: Array<any>;
  sortBy?: sortableFieldsProps;
  onSort?: Function;
  hasFooter?: boolean;
  loading?: boolean;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  sortableFields,
  sortBy,
  onSort,
  hasFooter,
  loading,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    footerGroups,
  }: {
    getTableProps: Function;
    getTableBodyProps: Function;
    headerGroups: Array<HeaderGroup>;
    rows: Array<Row>;
    prepareRow: Function;
    footerGroups: Array<HeaderGroup>;
  } = useTable({
    columns: columns || [],
    data: data || [],
  });

  const handleSort = (columnKey: string) => {
    if (onSort && (sortableFields || []).includes(columnKey)) {
      onSort(columnKey);
    }
  };

  return (
    <table
      {...getTableProps()}
      className="table-auto w-full border-collapse border-b border-slate-200 text-sm"
    >
      <thead>
        {headerGroups.map((headerGroup, key) => (
          <tr
            {...headerGroup.getHeaderGroupProps()}
            key={key}
            className="shadow-md shadow-slate-200"
          >
            {headerGroup.headers.map((column: any, key: number) => (
              <th
                className="px-4 py-3 text-left font-semibold capitalize"
                {...column.getHeaderProps()}
                onClick={() => handleSort(column.id)}
                key={`table-${column.id}-${key}`}
              >
                {column.render("Header")}
                {sortBy?.field === column.id && (
                  <span>
                    {sortBy?.sortOrder === "desc" ? (
                      <BsFillArrowUpSquareFill />
                    ) : (
                      <BsFillArrowDownSquareFill />
                    )}
                  </span>
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {loading && (
          <tr>
            <td className="py-12" colSpan={columns.length}>
              <Loader />
            </td>
          </tr>
        )}
        {!loading && !rows.length && (
          <tr>
            <td className="py-5" colSpan={columns.length}>
              <NoDataError />
            </td>
          </tr>
        )}
        {!loading &&
          rows.map((row, rowKey) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                key={`table-row-${rowKey}`}
                className="hover:bg-slate-200"
              >
                {row.cells.map((cell: any, key: number) => {
                  return (
                    <td
                      className="px-3 py-2 border-b border-slate-200"
                      {...cell.getCellProps()}
                      key={`table-cell-${rowKey}-${key}`}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
      </tbody>
      {hasFooter && (
        <tfoot>
          {footerGroups.map((group, index) => (
            <tr {...group.getFooterGroupProps()} key={index}>
              {group.headers.map((column: any, key: number) => (
                <td
                  {...column.getFooterProps()}
                  key={`table-footer-cell-${index}-${key}`}
                >
                  {column.render("Footer")}
                </td>
              ))}
            </tr>
          ))}
        </tfoot>
      )}
    </table>
  );
};
export default Table;
