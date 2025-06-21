"use client";

import { useQuery } from "@tanstack/react-query";
import { columns } from "./newsletters/data-table";
import { DataTable } from "./newsletters/data-table";
import { components } from "@/lib/api-types";
import { PaginationState, SortingState } from "@tanstack/react-table";
import React from "react";

async function getNewsletters(
  page: number,
  size: number,
  sorting: SortingState,
  category: string
): Promise<components["schemas"]["Page_Newsletter_"]> {
  const sortBy = sorting.length > 0 ? sorting[0].id : "published_date";
  const sortOrder = sorting.length > 0 && sorting[0].desc ? "desc" : "asc";

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  let url = `${apiUrl}/newsletters/?page=${page}&size=${size}&sort_by=${sortBy}&sort_order=${sortOrder}`;
  if (category && category !== "all") {
    url += `&category_id=${category}`;
  }

  const res = await fetch(url);
  return res.json();
}

export default function Home() {
  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
    });
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const { data, isLoading } = useQuery({
    queryKey: ["newsletters", pageIndex, pageSize, sorting, selectedCategory],
    queryFn: () =>
      getNewsletters(pageIndex + 1, pageSize, sorting, selectedCategory),
  });

  const pageCount = data?.total ? Math.ceil(data.total / pageSize) : 0;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Newsletters</h1>
      <DataTable
        columns={columns}
        data={data?.items ?? []}
        pageCount={pageCount}
        onPaginationChange={setPagination}
        pagination={pagination}
        onSortingChange={setSorting}
        sorting={sorting}
        onCategoryChange={setSelectedCategory}
        selectedCategory={selectedCategory}
        hideCategoryDropdown
      />
    </div>
  );
}
