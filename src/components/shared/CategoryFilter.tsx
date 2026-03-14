"use client";

import { motion } from "framer-motion";
import { CategoryItem } from "@/data/categories";

interface CategoryFilterProps {
  categories: CategoryItem[];
  selected: string | null;
  onSelect: (category: string | null) => void;
}

export function CategoryFilter({
  categories,
  selected,
  onSelect,
}: CategoryFilterProps) {
  return (
    <section className="px-5 py-2">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={() => onSelect(null)}
          className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
            selected === null
              ? "bg-orange-500 text-white shadow-sm shadow-orange-200"
              : "bg-white text-gray-600 shadow-sm"
          }`}
        >
          全部
        </motion.button>
        {categories.map((cat) => (
          <motion.button
            key={cat.id}
            whileTap={{ scale: 0.93 }}
            onClick={() =>
              onSelect(selected === cat.name ? null : cat.name)
            }
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              selected === cat.name
                ? "bg-orange-500 text-white shadow-sm shadow-orange-200"
                : "bg-white text-gray-600 shadow-sm"
            }`}
          >
            {cat.emoji} {cat.name}
          </motion.button>
        ))}
      </div>
    </section>
  );
}
