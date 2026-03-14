"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Clock, Wallet, Navigation, RotateCcw } from "lucide-react";
import type { ScoredRestaurant } from "@/hooks/useDecisionEngine";

interface ResultCardProps {
  restaurant: ScoredRestaurant;
  onAccept: () => void;
  onRetry: () => void;
}

export function ResultCard({ restaurant, onAccept, onRetry }: ResultCardProps) {
  return (
    <motion.div
      initial={{ scale: 0.3, y: 60, opacity: 0, rotate: -4 }}
      animate={{ scale: 1, y: 0, opacity: 1, rotate: 0 }}
      transition={{ type: "spring", damping: 14, stiffness: 120 }}
      className="w-full bg-white rounded-3xl overflow-hidden shadow-xl shadow-gray-200/60"
    >
      {/* ── Hero 题图 ── */}
      <div className="relative h-52">
        <Image
          src={restaurant.image_url}
          alt={restaurant.name}
          fill
          sizes="(max-width: 448px) 100vw, 400px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="text-[11px] bg-white/90 backdrop-blur-sm text-orange-500 font-semibold px-2.5 py-1 rounded-full">
            {restaurant.cuisine_category}
          </span>
          <h3 className="text-2xl font-bold text-white mt-2 drop-shadow-md">
            {restaurant.name}
          </h3>
          <div className="flex items-center gap-1 mt-1">
            <MapPin size={13} className="text-white/80" />
            <span className="text-sm text-white/80">
              {restaurant.cluster_zone}
            </span>
          </div>
        </div>
      </div>

      {/* ── 核心指标 ── */}
      <div className="p-5">
        <div className="flex gap-3">
          <div className="flex-1 bg-orange-50 rounded-2xl p-3 text-center">
            <Wallet size={18} className="text-orange-500 mx-auto" />
            <p className="text-lg font-bold text-gray-900 mt-1">
              ¥{restaurant.average_cost_rmb}
            </p>
            <p className="text-[10px] text-gray-400">人均</p>
          </div>
          <div className="flex-1 bg-blue-50 rounded-2xl p-3 text-center">
            <Clock size={18} className="text-blue-500 mx-auto" />
            <p className="text-lg font-bold text-gray-900 mt-1">
              {restaurant.walkMinutes}
              <span className="text-xs font-normal">min</span>
            </p>
            <p className="text-[10px] text-gray-400">步行</p>
          </div>
          <div className="flex-1 bg-green-50 rounded-2xl p-3 text-center">
            <Navigation size={18} className="text-green-500 mx-auto" />
            <p className="text-lg font-bold text-gray-900 mt-1">
              {Math.round(restaurant.distance)}
              <span className="text-xs font-normal">m</span>
            </p>
            <p className="text-[10px] text-gray-400">距离</p>
          </div>
        </div>

        {/* ── 场景标签 ── */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {restaurant.vibe_tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* ── 双按钮 CTA ── */}
        <div className="flex gap-3 mt-5">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={onAccept}
            className="flex-1 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-orange-200/60 text-sm"
          >
            就去这！
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={onRetry}
            className="flex items-center justify-center gap-1.5 px-5 border-2 border-orange-200 text-orange-500 font-bold py-3.5 rounded-2xl text-sm"
          >
            <RotateCcw size={15} />
            再来
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
