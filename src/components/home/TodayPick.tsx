"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Zap, RefreshCw, Clock, MapPin } from "lucide-react";
import { Restaurant } from "@/data/restaurants";
import { getCuisineGradient } from "@/data/categories";

interface TodayPickProps {
  restaurant: Restaurant;
  onRefresh: () => void;
  onTap: (restaurant: Restaurant) => void;
}

export function TodayPick({ restaurant, onRefresh, onTap }: TodayPickProps) {
  return (
    <section className="px-5 py-2">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Zap className="text-orange-500" size={18} fill="currentColor" />
          <h2 className="text-lg font-bold text-gray-900">今日推荐</h2>
        </div>
        <motion.button
          whileTap={{ scale: 0.85, rotate: 180 }}
          onClick={(e) => {
            e.stopPropagation();
            onRefresh();
          }}
          className="text-gray-400 p-1.5 hover:text-orange-500 transition-colors"
        >
          <RefreshCw size={16} />
        </motion.button>
      </div>

      <motion.div
        key={restaurant.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 200 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onTap(restaurant)}
        className="relative bg-white rounded-3xl overflow-hidden shadow-sm cursor-pointer"
      >
        <div
          className={`relative h-40 bg-gradient-to-br ${getCuisineGradient(
            restaurant.cuisine_category
          )}`}
        >
          <Image
            src={restaurant.image_url}
            alt={restaurant.name}
            fill
            sizes="(max-width: 448px) 100vw, 400px"
            className="object-cover"
          />
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1">
            <span className="text-xs font-bold text-orange-500">
              ¥{restaurant.average_cost_rmb}/人
            </span>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-900">{restaurant.name}</h3>
            <span className="text-xs text-gray-400">
              {restaurant.cluster_zone}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1 text-gray-400">
              <Clock size={12} />
              <span className="text-xs">
                约{restaurant.wait_time_minutes}分钟
              </span>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <MapPin size={12} />
              <span className="text-xs">{restaurant.cluster_zone}</span>
            </div>
          </div>
          <div className="flex gap-1 mt-2">
            {restaurant.vibe_tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] bg-orange-50 text-orange-500 px-1.5 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
