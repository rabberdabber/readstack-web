"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { components } from "@/lib/api-types";

interface CategoryChipsProps {
  onCategoryChange: (category: string) => void;
  selectedCategory: string;
}

type Category = components["schemas"]["Category"];

async function getCategories(): Promise<Category[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/categories/`);
  return res.json();
}

export function CategoryChips({
  onCategoryChange,
  selectedCategory,
}: CategoryChipsProps) {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selectedCategory === "all" ? "default" : "outline"}
        onClick={() => onCategoryChange("all")}
      >
        All Categories
      </Button>
      {isLoading && <div>Loading categories...</div>}
      {categories?.map((category) => (
        <Button
          key={category.id}
          variant={
            selectedCategory === category.id.toString() ? "default" : "outline"
          }
          onClick={() => onCategoryChange(category.id.toString())}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
}
