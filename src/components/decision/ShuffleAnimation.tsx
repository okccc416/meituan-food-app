"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getCuisineEmoji } from "@/data/categories";

interface ShuffleItem {
  name: string;
  cuisine_category: string;
  cluster_zone: string;
}

interface ShuffleAnimationProps {
  restaurants: ShuffleItem[];
}

/**
 * 卡片洗牌动画
 *
 * 视觉隐喻：快速翻动的卡片从底部飞入、顶部飞出，
 * 循环速度先快后慢（80ms → 400ms），模拟老虎机减速效果。
 * 总时长约 2.5 秒，与 useDecisionEngine 的 2.6s 等待对齐。
 */
export function ShuffleAnimation({ restaurants }: ShuffleAnimationProps) {
  const [index, setIndex] = useState(0);
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;
    let delay = 80;
    let elapsed = 0;

    const tick = () => {
      if (!alive.current) return;
      setIndex((i) => (i + 1) % Math.max(restaurants.length, 1));
      elapsed += delay;
      if (elapsed > 1600) delay = Math.min(delay * 1.14, 420);
      if (elapsed < 2500 && alive.current) setTimeout(tick, delay);
    };

    setTimeout(tick, delay);
    return () => {
      alive.current = false;
    };
  }, [restaurants.length]);

  const current = restaurants[index % Math.max(restaurants.length, 1)];
  if (!current) return null;

  return (
    <div className="flex flex-col items-center gap-5 py-8">
      <div className="relative h-28 w-72 flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 0, scale: 0.85, rotateX: -20 }}
            animate={{ y: 0, opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ y: -50, opacity: 0, scale: 0.85, rotateX: 20 }}
            transition={{ duration: 0.08 }}
            className="absolute inset-0 bg-white rounded-2xl px-5 py-4 shadow-lg flex items-center gap-4"
          >
            <span className="text-4xl">
              {getCuisineEmoji(current.cuisine_category)}
            </span>
            <div className="min-w-0">
              <p className="text-base font-bold text-gray-900 truncate">
                {current.name}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {current.cuisine_category} · {current.cluster_zone}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-2 h-2 rounded-full bg-orange-400"
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
            transition={{
              repeat: Infinity,
              duration: 0.7,
              delay: i * 0.15,
            }}
          />
        ))}
      </div>
      <p className="text-sm text-gray-400">命运的齿轮正在转动...</p>
    </div>
  );
}
