"use client";

import { useQuery } from "@tanstack/react-query";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { components } from "@/lib/api-types";
import { CategoryChips } from "./category-chips";

interface DataTableToolbarProps {
  onCategoryChange: (category: string) => void;
  selectedCategory: string;
  hideCategoryDropdown?: boolean;
}

type Category = components["schemas"]["Category"];

async function getCategories(): Promise<Category[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/categories/`);
  return res.json();
}

export function DataTableToolbar({
  onCategoryChange,
  selectedCategory,
  hideCategoryDropdown = false,
}: DataTableToolbarProps) {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {!hideCategoryDropdown && (
          <Select
            onValueChange={onCategoryChange}
            value={selectedCategory}
            disabled={!categories}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories?.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        <CategoryChips
          onCategoryChange={onCategoryChange}
          selectedCategory={selectedCategory}
        />
      </div>
    </div>
  );
}
