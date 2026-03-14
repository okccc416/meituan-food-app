"use client";

import { useMotionValue, animate } from "framer-motion";
import { useState, useCallback } from "react";
import { CategoryItem } from "@/data/categories";

/**
 * 转盘物理动画 Hook
 *
 * 接收动态分类列表（从餐厅数据派生），驱动 MotionValue 旋转。
 * 使用 framer-motion 的 animate() 返回 Promise，
 * await 完成后才写入结果，避免动画未结束就提前渲染。
 */
export function useSpinWheel(categories: CategoryItem[]) {
  const rotation = useMotionValue(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<CategoryItem | null>(null);

  const segmentAngle = 360 / (categories.length || 1);

  const spin = useCallback(async (): Promise<CategoryItem | undefined> => {
    if (isSpinning || categories.length === 0) return undefined;
    setIsSpinning(true);
    setResult(null);

    const targetIndex = Math.floor(Math.random() * categories.length);
    const segCenter = targetIndex * segmentAngle + segmentAngle / 2;
    const extraSpins = 5 + Math.floor(Math.random() * 3);
    const current = rotation.get();
    const currentMod = ((current % 360) + 360) % 360;

    let delta = segCenter - currentMod;
    if (delta <= 0) delta += 360;

    const target = current + extraSpins * 360 + delta;

    await animate(rotation, target, {
      duration: 4 + Math.random(),
      ease: [0.15, 0.85, 0.25, 1],
    });

    const selected = categories[targetIndex];
    setResult(selected);
    setIsSpinning(false);
    return selected;
  }, [isSpinning, categories, rotation, segmentAngle]);

  const reset = useCallback(() => setResult(null), []);

  return { rotation, isSpinning, result, spin, reset, segmentAngle };
}
