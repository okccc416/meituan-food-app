"use client";

import { useMemo, useState } from "react";
import { Restaurant } from "@/data/restaurants";

export type SortBy = "recommendation" | "price" | "wait_time";

export function useRestaurants(
  restaurants: Restaurant[],
  selectedCategory: string | null
) {
  const [sortBy, setSortBy] = useState<SortBy>("recommendation");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let result = [...restaurants];

    if (selectedCategory) {
      result = result.filter((r) => r.cuisine_category === selectedCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.vibe_tags.some((t) => t.includes(q)) ||
          r.cuisine_category.includes(q) ||
          r.cluster_zone.includes(q)
      );
    }

    switch (sortBy) {
      case "price":
        result.sort((a, b) => a.average_cost_rmb - b.average_cost_rmb);
        break;
      case "wait_time":
        result.sort((a, b) => a.wait_time_minutes - b.wait_time_minutes);
        break;
      default:
        result.sort((a, b) => a.price_tier - b.price_tier);
    }

    return result;
  }, [restaurants, selectedCategory, sortBy, searchQuery]);

  return { filtered, sortBy, setSortBy, searchQuery, setSearchQuery };
}
