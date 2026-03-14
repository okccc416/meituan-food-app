"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { BottomNav } from "@/components/layout/BottomNav";
import { CategoryFilter } from "@/components/shared/CategoryFilter";
import { FoodCard } from "@/components/shared/FoodCard";
import { RestaurantSheet } from "@/components/shared/RestaurantSheet";
import { restaurants } from "@/data/restaurants";
import { buildCategories } from "@/data/categories";
import { useRestaurants, SortBy } from "@/hooks/useRestaurants";
import type { Restaurant } from "@/data/restaurants";

const sortOptions: { key: SortBy; label: string }[] = [
  { key: "recommendation", label: "推荐" },
  { key: "price", label: "价格" },
  { key: "wait_time", label: "等待" },
];

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);

  const categories = useMemo(
    () => buildCategories(restaurants.map((r) => r.cuisine_category)),
    []
  );

  const { filtered, sortBy, setSortBy, searchQuery, setSearchQuery } =
    useRestaurants(restaurants, selectedCategory);

  return (
    <div className="pb-24">
      <div className="px-5 pt-14 pb-3">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          探索美食 🔍
        </h1>
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="搜索餐厅、菜系、标签、区域..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white rounded-2xl text-sm text-gray-900 placeholder:text-gray-400 shadow-sm outline-none focus:ring-2 focus:ring-orange-200 transition-shadow"
          />
        </div>
      </div>

      <CategoryFilter
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <div className="flex items-center gap-2 px-5 py-2">
        <SlidersHorizontal size={14} className="text-gray-400" />
        {sortOptions.map((opt) => (
          <button
            key={opt.key}
            onClick={() => setSortBy(opt.key)}
            className={`text-xs px-3 py-1 rounded-full transition-colors ${
              sortBy === opt.key
                ? "bg-orange-500 text-white"
                : "text-gray-500 bg-white shadow-sm"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <section className="px-5 mt-2">
        <p className="text-xs text-gray-400 mb-3">
          共 {filtered.length} 家餐厅
        </p>
        <div className="space-y-3">
          {filtered.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <FoodCard
                restaurant={r}
                onTap={() => setSelectedRestaurant(r)}
              />
            </motion.div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-2">🔍</p>
            <p className="text-sm">没有找到相关餐厅</p>
          </div>
        )}
      </section>

      <AnimatePresence>
        {selectedRestaurant && (
          <RestaurantSheet
            restaurant={selectedRestaurant}
            onClose={() => setSelectedRestaurant(null)}
          />
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
}
