"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { X, MapPin, Clock, Wallet } from "lucide-react";
import { Restaurant } from "@/data/restaurants";
import { getCuisineGradient } from "@/data/categories";
import { ProxyPickup } from "@/components/shared/ProxyPickup";

interface RestaurantSheetProps {
  restaurant: Restaurant;
  onClose: () => void;
}

export function RestaurantSheet({ restaurant, onClose }: RestaurantSheetProps) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-40"
      />

      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        drag="y"
        dragConstraints={{ top: 0 }}
        dragElastic={0.15}
        onDragEnd={(_, info) => {
          if (info.offset.y > 150 || info.velocity.y > 500) onClose();
        }}
        className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white rounded-t-3xl z-50 max-h-[85vh] overflow-y-auto"
      >
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        <div
          className={`relative h-48 bg-gradient-to-br ${getCuisineGradient(
            restaurant.cuisine_category
          )} mx-4 rounded-2xl overflow-hidden`}
        >
          <Image
            src={restaurant.image_url}
            alt={restaurant.name}
            fill
            sizes="(max-width: 448px) 100vw, 400px"
            className="object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center"
          >
            <X size={16} className="text-gray-600" />
          </button>
        </div>

        <div className="p-5">
          <h2 className="text-xl font-bold text-gray-900">
            {restaurant.name}
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {restaurant.cuisine_category} · {restaurant.cluster_zone}
          </p>

          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="bg-orange-50 rounded-2xl p-3 text-center">
              <p className="text-lg font-bold text-orange-500">
                ¥{restaurant.average_cost_rmb}
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">人均消费</p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-3 text-center">
              <p className="text-lg font-bold text-blue-500">
                {restaurant.wait_time_minutes}
                <span className="text-xs">min</span>
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">预计等待</p>
            </div>
            <div className="bg-purple-50 rounded-2xl p-3 text-center">
              <p className="text-lg font-bold text-purple-500">
                {"¥".repeat(restaurant.price_tier)}
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">价格档位</p>
            </div>
          </div>

          <div className="mt-5">
            <h3 className="text-sm font-bold text-gray-900 mb-2">
              🏷️ 场景标签
            </h3>
            <div className="flex flex-wrap gap-2">
              {restaurant.vibe_tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-bold text-gray-900 mb-2">
              📍 位置信息
            </h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-gray-500">
                <MapPin size={14} className="flex-shrink-0" />
                <span className="text-xs">{restaurant.cluster_zone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <Clock size={14} className="flex-shrink-0" />
                <span className="text-xs">
                  预计等待 {restaurant.wait_time_minutes} 分钟
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <Wallet size={14} className="flex-shrink-0" />
                <span className="text-xs">
                  人均 ¥{restaurant.average_cost_rmb}
                </span>
              </div>
            </div>
          </div>

          {/* 顺路代拿 */}
          <div className="mt-5">
            <ProxyPickup
              restaurantId={restaurant.id}
              restaurantName={restaurant.name}
              walkMinutes={restaurant.wait_time_minutes}
              compact
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            className="w-full mt-5 mb-6 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-orange-200/60"
          >
            就去这家！🚀
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}
