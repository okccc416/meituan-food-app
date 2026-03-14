"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { mockRestaurants, MockRestaurant, CITIES, CityKey } from "@/data/mockData";
import { RestaurantCard } from "./RestaurantCard";
import { MapArea } from "./MapArea";

const quickFilters = [
  { id: "walk5", label: "🚶 步行5分钟内" },
  { id: "under20", label: "💰 人均20以内" },
  { id: "hasAC", label: "❄️ 有空调" },
  { id: "trial", label: "🔥 防踩雷试吃" },
  { id: "introvert", label: "🤫 I人专座" },
  { id: "extrovert", label: "🎉 E人聚餐" },
  { id: "latenight", label: "🌙 深夜食堂" },
];

function matchFilter(r: MockRestaurant, id: string): boolean {
  switch (id) {
    case "walk5": return r.walkMinutes <= 5;
    case "under20": return r.avgPrice <= 20;
    case "hasAC": return r.hasAC;
    case "trial": return r.has_trial_meal;
    case "introvert": return r.mbti_tags.some((t) => t.includes("I人"));
    case "extrovert": return r.mbti_tags.some((t) => t.includes("E人"));
    case "latenight": return r.scenes.includes("latenight");
    default: return true;
  }
}

interface DiscoverViewProps {
  city: CityKey;
  onSelect?: (r: MockRestaurant) => void;
}

export function DiscoverView({ city, onSelect }: DiscoverViewProps) {
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const cityRestaurants = useMemo(
    () => mockRestaurants.filter((r) => r.city === city),
    [city],
  );

  const filtered = useMemo(() => {
    let result = [...cityRestaurants];
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.tags.some((t) => t.includes(q)) ||
          r.emoji_tags.some((t) => t.includes(q)) ||
          r.mbti_tags.some((t) => t.includes(q)) ||
          r.cuisine.includes(q) ||
          r.zone.includes(q),
      );
    }
    for (const fid of activeFilters) {
      result = result.filter((r) => matchFilter(r, fid));
    }
    return result;
  }, [query, activeFilters, cityRestaurants]);

  const toggleFilter = (id: string) => {
    setActiveFilters((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  const cityConfig = CITIES[city];

  return (
    <div className="p-4 md:p-6">
      <div className="mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          🌍 发现美食
        </h2>
        <p className="text-sm text-gray-400 mt-0.5">
          {cityConfig.name}周边 {cityRestaurants.length} 家精选
        </p>
      </div>

      <div className="relative mb-3">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="搜索餐厅、标签、MBTI、区域..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white rounded-2xl shadow-sm text-sm outline-none focus:ring-2 focus:ring-orange-200 transition-shadow"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide mb-4">
        {quickFilters.map((f) => (
          <motion.button
            key={f.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleFilter(f.id)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeFilters.includes(f.id)
                ? "bg-orange-500 text-white shadow-sm shadow-orange-200"
                : "bg-white text-gray-500 shadow-sm hover:bg-orange-50"
            }`}
          >
            {f.label}
          </motion.button>
        ))}
      </div>

      {/* Single MapArea: order-1 on mobile (top), order-2 on desktop (sidebar) */}
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="flex-1 space-y-3 order-2 lg:order-1">
          <p className="text-xs text-gray-400 mb-1">共 {filtered.length} 家餐厅</p>
          <AnimatePresence>
            {filtered.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: i * 0.03 }}
              >
                <RestaurantCard restaurant={r} onSelect={onSelect} />
              </motion.div>
            ))}
          </AnimatePresence>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <p className="text-4xl mb-3">🍜</p>
              <p className="text-sm">没有找到符合条件的餐厅</p>
              <p className="text-xs mt-1">试试调整筛选条件？</p>
            </div>
          )}
        </div>

        <div className="order-1 lg:order-2 lg:w-[400px] xl:w-[440px] lg:flex-shrink-0">
          <div className="lg:sticky lg:top-6">
            <MapArea
              restaurants={filtered}
              center={cityConfig.center}
              zoom={cityConfig.zoom}
              onSelect={onSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
