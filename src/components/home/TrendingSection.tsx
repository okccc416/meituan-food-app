"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TrendingUp, MapPin } from "lucide-react";
import { Restaurant } from "@/data/restaurants";
import { getCuisineGradient } from "@/data/categories";

interface TrendingSectionProps {
  restaurants: Restaurant[];
  onTap: (restaurant: Restaurant) => void;
}

export function TrendingSection({ restaurants, onTap }: TrendingSectionProps) {
  if (restaurants.length === 0) return null;

  return (
    <section className="py-2 mt-2">
      <div className="flex items-center gap-2 px-5 mb-3">
        <TrendingUp className="text-orange-500" size={18} />
        <h2 className="text-lg font-bold text-gray-900">大家都在吃</h2>
      </div>

      <div className="flex gap-3 overflow-x-auto px-5 pb-2 scrollbar-hide">
        {restaurants.map((restaurant, index) => (
          <motion.div
            key={restaurant.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onTap(restaurant)}
            className="flex-shrink-0 w-40 bg-white rounded-2xl overflow-hidden shadow-sm cursor-pointer"
          >
            <div
              className={`relative h-24 bg-gradient-to-br ${getCuisineGradient(
                restaurant.cuisine_category
              )}`}
            >
              <Image
                src={restaurant.image_url}
                alt={restaurant.name}
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>
            <div className="p-2.5">
              <h3 className="font-bold text-sm text-gray-900 truncate">
                {restaurant.name}
              </h3>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-[10px] font-semibold text-orange-500">
                  ¥{restaurant.average_cost_rmb}
                </span>
                <span className="text-[10px] text-gray-300">·</span>
                <MapPin size={10} className="text-gray-400" />
                <span className="text-[10px] text-gray-400">
                  {restaurant.cluster_zone}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
