"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import SearchInput from "@/components/search-input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { DataTablePagination } from "./data-table-pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination: {
    pageIndex: number;
    pageSize: number;
    pageCount: number;
    onPaginationChange: (updater: any) => void;
  };
  title: string;
  loading?: boolean;
  loadingTitle?: boolean;
  actionButton?: ReactNode;
  onGlobalFilterChange: (value: string) => void;
  globalFilter: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pagination,
  title,
  loading,
  loadingTitle,
  actionButton,
  onGlobalFilterChange,
  globalFilter,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [searchValue, setSearchValue] = useState(globalFilter ?? "");

  useEffect(() => {
    const timer = setTimeout(() => {
      onGlobalFilterChange(searchValue);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [searchValue, onGlobalFilterChange]);

  const table = useReactTable({
    data,
    columns,
    pageCount: pagination.pageCount,
    state: {
      pagination: {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      },
      columnFilters,
      globalFilter,
    },
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newPagination = updater({
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
        });
        pagination.onPaginationChange(newPagination);
      } else {
        pagination.onPaginationChange(updater);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange,
    manualFiltering: true,
  });

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-5">
        <div className="flex flex-wrap items-center gap-5">
          {loadingTitle ? (
            <Skeleton className="h-9 w-36" />
          ) : (
            <h2 className="duration-500 animate-in fade-in slide-in-from-bottom-3">
              {title}
            </h2>
          )}
          <SearchInput
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </div>

        <div className="duration-500 animate-in fade-in slide-in-from-bottom-3">
          {actionButton}
        </div>
      </div>
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="text-primary h-8 w-8 animate-spin" />
        </div>
      ) : (
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="pointer-events-none h-24 text-center"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
      {!loading && <DataTablePagination table={table} />}
    </>
  );
}
