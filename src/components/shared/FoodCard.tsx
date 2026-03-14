"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";
import { Restaurant } from "@/data/restaurants";
import { getCuisineGradient } from "@/data/categories";

interface FoodCardProps {
  restaurant: Restaurant;
  onTap: () => void;
}

export function FoodCard({ restaurant, onTap }: FoodCardProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onTap}
      className="bg-white rounded-2xl overflow-hidden shadow-sm active:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex">
        <div
          className={`relative w-28 h-28 flex-shrink-0 bg-gradient-to-br ${getCuisineGradient(
            restaurant.cuisine_category
          )}`}
        >
          <Image
            src={restaurant.image_url}
            alt={restaurant.name}
            fill
            sizes="112px"
            className="object-cover"
          />
        </div>

        <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
          <div>
            <h3 className="font-bold text-gray-900 text-sm truncate">
              {restaurant.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-orange-500 font-semibold">
                ¥{restaurant.average_cost_rmb}/人
              </span>
              <span className="text-xs text-gray-300">·</span>
              <span className="text-xs text-gray-400">
                {restaurant.cuisine_category}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-1 overflow-hidden">
              {restaurant.vibe_tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] bg-orange-50 text-orange-500 px-1.5 py-0.5 rounded-full whitespace-nowrap"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 text-gray-400">
              <div className="flex items-center gap-0.5">
                <Clock size={10} />
                <span className="text-[10px]">
                  {restaurant.wait_time_minutes}min
                </span>
              </div>
              <div className="flex items-center gap-0.5">
                <MapPin size={10} />
                <span className="text-[10px]">
                  {restaurant.cluster_zone}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
