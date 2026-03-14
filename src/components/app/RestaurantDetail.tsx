"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Clock, Wallet, Star, Navigation, ShieldCheck } from "lucide-react";
import { MockRestaurant } from "@/data/mockData";
import { ProxyPickup } from "@/components/shared/ProxyPickup";

const STICKER_ROTATIONS = [-2, 1.5, -1, 2.5, -1.5];
const AVATAR_COLORS = [
  "bg-orange-400",
  "bg-blue-400",
  "bg-pink-400",
  "bg-emerald-400",
  "bg-purple-400",
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={11}
          className={
            s <= rating
              ? "text-amber-400 fill-amber-400"
              : "text-gray-200"
          }
        />
      ))}
    </div>
  );
}

interface RestaurantDetailProps {
  restaurant: MockRestaurant | null;
  onClose: () => void;
}

export function RestaurantDetail({
  restaurant,
  onClose,
}: RestaurantDetailProps) {
  if (!restaurant) return null;

  return (
    <AnimatePresence>
      {restaurant && (
        <>
          <motion.div
            key="detail-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-[70] flex items-end md:items-center justify-center md:p-6 pointer-events-none">
            <motion.div
              key="detail-card"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{
                type: "spring",
                damping: 28,
                stiffness: 260,
              }}
              className="bg-white rounded-t-3xl md:rounded-3xl w-full md:max-w-lg max-h-[90vh] overflow-y-auto pointer-events-auto shadow-2xl"
            >
              {/* Hero */}
              <div className="relative h-52">
                <Image
                  src={restaurant.image}
                  alt={restaurant.name}
                  fill
                  sizes="500px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center"
                >
                  <X size={18} />
                </button>
                <div className="absolute bottom-4 left-5 right-5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] bg-orange-500 text-white px-2.5 py-0.5 rounded-full font-medium">
                      {restaurant.cuisine}
                    </span>
                    {restaurant.hygiene_rating === "A" && (
                      <span className="flex items-center gap-0.5 bg-emerald-500/90 text-white px-2 py-0.5 rounded-full text-[10px] font-bold">
                        <ShieldCheck size={10} /> 明厨亮灶 A级
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    {restaurant.name}
                  </h2>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Star
                      size={12}
                      className="text-amber-300 fill-amber-300"
                    />
                    <span className="text-sm font-semibold text-white/90">
                      {restaurant.rating}
                    </span>
                    <span className="text-xs text-white/60 ml-1">
                      {restaurant.reviews.length}条评价
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5">
                {/* 核心指标 */}
                <div className="flex gap-2 mb-5">
                  {[
                    {
                      icon: Wallet,
                      label: "人均",
                      value: `¥${restaurant.avgPrice}`,
                    },
                    {
                      icon: Clock,
                      label: "步行",
                      value: `${restaurant.walkMinutes}min`,
                    },
                    {
                      icon: MapPin,
                      label: "商圈",
                      value: restaurant.zone,
                    },
                  ].map((m) => (
                    <div
                      key={m.label}
                      className="flex-1 bg-gray-50 rounded-xl p-2.5 text-center"
                    >
                      <m.icon
                        size={14}
                        className="mx-auto text-gray-400 mb-1"
                      />
                      <p className="text-xs font-bold text-gray-900">
                        {m.value}
                      </p>
                      <p className="text-[9px] text-gray-400">{m.label}</p>
                    </div>
                  ))}
                </div>

                {/* Trial meal */}
                {restaurant.has_trial_meal && (
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 rounded-xl px-3 py-2.5 flex items-center gap-2 mb-3">
                    <span className="text-lg">🔥</span>
                    <div>
                      <p className="text-xs font-bold text-orange-700">15元防踩雷特供</p>
                      <p className="text-[10px] text-orange-500/80">单人试吃套餐 · 不满意不花冤枉钱</p>
                    </div>
                  </div>
                )}

                {/* Last 100m delivery status */}
                {restaurant.last_100m_status && (
                  <div className="bg-sky-50 border border-sky-100 rounded-xl px-3 py-2 flex items-center gap-2 mb-5">
                    <span className="text-sm">📦</span>
                    <div>
                      <p className="text-xs font-semibold text-sky-700">{restaurant.last_100m_status}</p>
                      {restaurant.opening_hours && (
                        <p className="text-[10px] text-sky-500/80">营业时间：{restaurant.opening_hours}{restaurant.delivery_fee ? ` · 配送费 ¥${restaurant.delivery_fee}` : " · 免配送费"}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* 顺路代拿 */}
                <div className="mb-5">
                  <ProxyPickup
                    restaurantId={restaurant.id}
                    restaurantName={restaurant.name}
                    walkMinutes={restaurant.walkMinutes}
                    currentViewers={restaurant.current_viewers}
                  />
                </div>

                {/* Emoji + MBTI tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {restaurant.emoji_tags.map((tag, i) => (
                    <span
                      key={tag}
                      style={{ transform: `rotate(${STICKER_ROTATIONS[i % STICKER_ROTATIONS.length]}deg)` }}
                      className="inline-block text-xs bg-amber-50 border border-amber-100/80 text-amber-700 px-2.5 py-1 rounded-lg shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
                    >
                      {tag}
                    </span>
                  ))}
                  {restaurant.mbti_tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block text-xs bg-violet-50 border border-violet-100/80 text-violet-600 px-2.5 py-1 rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* 招牌菜 */}
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-gray-900 mb-3">
                    🍽️ 招牌推荐
                  </h3>
                  <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide -mx-5 px-5">
                    {restaurant.signature_dishes.map((dish) => (
                      <div
                        key={dish.name}
                        className="flex-shrink-0 w-28 bg-gray-50 rounded-2xl p-3 text-center relative"
                      >
                        {dish.popular && (
                          <span className="absolute -top-1.5 -right-1.5 text-[8px] bg-red-500 text-white px-1.5 py-0.5 rounded-full font-bold">
                            招牌
                          </span>
                        )}
                        <span className="text-2xl">{dish.emoji}</span>
                        <p className="text-[11px] font-semibold text-gray-800 mt-1.5 leading-tight">
                          {dish.name}
                        </p>
                        <p className="text-xs font-bold text-orange-500 mt-1">
                          ¥{dish.price}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 真实评价 */}
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-gray-900 mb-3">
                    💬 真实评价
                  </h3>
                  <div className="space-y-3">
                    {restaurant.reviews.map((review, i) => (
                      <div
                        key={i}
                        className="bg-gray-50 rounded-2xl p-3.5"
                      >
                        <div className="flex items-center gap-2.5 mb-2">
                          <div
                            className={`w-7 h-7 ${AVATAR_COLORS[i % AVATAR_COLORS.length]} rounded-full flex items-center justify-center`}
                          >
                            <span className="text-[10px] font-bold text-white">
                              {review.user.charAt(0)}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-gray-800">
                                {review.user}
                              </span>
                              <span className="text-[10px] text-gray-400">
                                {review.date}
                              </span>
                            </div>
                            <StarRating rating={review.rating} />
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {review.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="flex gap-3 pb-2">
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold py-3.5 rounded-2xl text-sm shadow-lg shadow-orange-200/40"
                  >
                    <Navigation size={15} />
                    导航去这里
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={onClose}
                    className="px-5 border-2 border-gray-200 text-gray-500 font-bold py-3.5 rounded-2xl text-sm hover:bg-gray-50 transition-colors"
                  >
                    关闭
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
