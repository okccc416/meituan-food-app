"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Clock, ShieldCheck, HandCoins } from "lucide-react";
import { MockRestaurant } from "@/data/mockData";

const STICKER_ROTATIONS = [-2, 1.5, -1.5, 2, -1];

interface RestaurantCardProps {
  restaurant: MockRestaurant;
  onSelect?: (r: MockRestaurant) => void;
}

export function RestaurantCard({ restaurant, onSelect }: RestaurantCardProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect?.(restaurant)}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex">
        <div className="relative w-28 h-28 flex-shrink-0">
          <Image
            src={restaurant.image}
            alt={restaurant.name}
            fill
            sizes="112px"
            className="object-cover"
          />
          <div className="absolute top-1.5 right-1.5 flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full pl-1 pr-1.5 py-0.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-[9px] text-white/90 font-medium">
              {restaurant.current_viewers}人看
            </span>
          </div>
          {restaurant.has_trial_meal && (
            <div className="absolute bottom-1.5 left-1.5 bg-orange-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-md">
              🔥 ¥15试吃
            </div>
          )}
          {restaurant.bounty_reward && (
            <div className="absolute top-1.5 left-1.5 flex items-center gap-0.5 bg-emerald-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-md shadow-sm animate-pulse">
              <HandCoins size={9} />
              顺路赚¥{restaurant.bounty_reward}
            </div>
          )}
        </div>

        <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-sm text-gray-900 truncate">{restaurant.name}</h3>
              {restaurant.hygiene_rating === "A" && (
                <span className="flex items-center gap-0.5 bg-emerald-50 text-emerald-600 px-1 py-px rounded text-[8px] font-bold flex-shrink-0">
                  <ShieldCheck size={8} /> A
                </span>
              )}
              <span className="text-xs text-orange-500 font-semibold flex-shrink-0 ml-auto">
                ¥{restaurant.avgPrice}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-[11px] text-gray-400">
              <span className="flex items-center gap-0.5">
                <MapPin size={10} />{restaurant.zone}
              </span>
              <span className="text-gray-200">|</span>
              <span className="flex items-center gap-0.5">
                <Clock size={10} />{restaurant.walkMinutes}min
              </span>
            </div>
            {restaurant.last_100m_status && (
              <div className="mt-1">
                <span className="text-[8px] bg-sky-50 border border-sky-100 text-sky-600 px-1.5 py-0.5 rounded-md font-medium">
                  📦 {restaurant.last_100m_status}
                </span>
              </div>
            )}
          </div>
          <div className="flex gap-1 overflow-hidden mt-1 flex-wrap">
            {restaurant.emoji_tags.slice(0, 2).map((tag, i) => (
              <span
                key={tag}
                style={{ transform: `rotate(${STICKER_ROTATIONS[i % STICKER_ROTATIONS.length]}deg)` }}
                className="inline-block text-[9px] bg-amber-50 border border-amber-100/80 text-amber-700 px-1.5 py-0.5 rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.06)] whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
            {restaurant.mbti_tags.slice(0, 1).map((tag) => (
              <span
                key={tag}
                className="inline-block text-[9px] bg-violet-50 border border-violet-100/80 text-violet-600 px-1.5 py-0.5 rounded-lg whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
