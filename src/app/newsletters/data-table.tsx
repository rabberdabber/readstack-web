"use client";

import Link from "next/link";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";
import { format } from "date-fns";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { components } from "@/lib/api-types";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";

type Newsletter = components["schemas"]["Newsletter"];

export const columns: ColumnDef<Newsletter>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const newsletter = row.original;
      return (
        <Link
          href={newsletter.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-blue-500"
        >
          {newsletter.title}
        </Link>
      );
    },
  },
  {
    accessorKey: "source",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Source" />
    ),
  },
  {
    accessorKey: "category.name",
    header: "Category",
    cell: ({ row }) => {
      return row.original.category.name;
    },
  },
  {
    accessorKey: "published_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Published Date" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("published_date");
      if (typeof date !== "string") return null;
      return <span>{format(new Date(date), "yyyy-MM-dd")}</span>;
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("created_at");
      if (typeof date !== "string") return null;
      return <span>{format(new Date(date), "yyyy-MM-dd HH:mm:ss")}</span>;
    },
  },
];

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount: number;
  onPaginationChange: React.Dispatch<React.SetStateAction<PaginationState>>;
  pagination: PaginationState;
  onSortingChange: React.Dispatch<React.SetStateAction<SortingState>>;
  sorting: SortingState;
  onCategoryChange: (category: string) => void;
  selectedCategory: string;
  hideCategoryDropdown?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageCount,
  onPaginationChange,
  pagination,
  onSortingChange,
  sorting,
  onCategoryChange,
  selectedCategory,
  hideCategoryDropdown,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: {
      pagination,
      sorting,
    },
    onPaginationChange: onPaginationChange,
    onSortingChange: onSortingChange,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    manualSorting: true,
  });

  return (
    <div className="space-y-4">
      <DataTableToolbar
        onCategoryChange={onCategoryChange}
        selectedCategory={selectedCategory}
        hideCategoryDropdown={hideCategoryDropdown}
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
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
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
