"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import { Restaurant, restaurants as rawRestaurants } from "@/data/restaurants";

/* ────────── 松江大学城中心点 ────────── */
const USER_LAT = 31.05;
const USER_LNG = 121.211;

/* ────────── Haversine 球面距离（米） ────────── */
function haversine(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6_371_000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function metersToWalkMin(m: number): number {
  return Math.max(1, Math.round(m / 80));
}

/* ────────── 对外暴露的带评分餐厅类型 ────────── */
export interface ScoredRestaurant extends Restaurant {
  distance: number;
  walkMinutes: number;
  weight: number;
}

/**
 * 决策引擎 Hook
 *
 * 算法流水线：
 *   1. 硬过滤  → 剔除超预算 1.2x 或超距离的餐厅
 *   2. 权重计算 → 距离衰减 × 标签命中 × 价格激励
 *   3. 轮盘抽选 → Roulette Wheel Selection，概率正比于权重
 */
export function useDecisionEngine() {
  const [budget, setBudget] = useState(30);
  const [maxDistance, setMaxDistance] = useState(2000);
  const [userTags, setUserTags] = useState<string[]>([]);
  const [result, setResult] = useState<ScoredRestaurant | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const spinLock = useRef(false);

  const allTags = useMemo(() => {
    const s = new Set<string>();
    rawRestaurants.forEach((r) => r.vibe_tags.forEach((t) => s.add(t)));
    return [...s];
  }, []);

  /* ──── 硬过滤 + 权重打分 ──── */
  const candidates = useMemo<ScoredRestaurant[]>(() => {
    return rawRestaurants
      .map((r) => {
        const distance = haversine(
          USER_LAT,
          USER_LNG,
          r.location_coordinates.lat,
          r.location_coordinates.lng
        );
        return {
          ...r,
          distance,
          walkMinutes: metersToWalkMin(distance),
          weight: 0,
        };
      })
      .filter((r) => r.average_cost_rmb <= budget * 1.2)
      .filter((r) => r.distance <= maxDistance)
      .map((r) => {
        let w = 1000 / (1 + r.distance);

        if (userTags.length > 0) {
          const hits = r.vibe_tags.filter((t) =>
            userTags.includes(t)
          ).length;
          w *= Math.pow(1.3, hits);
        }

        if (r.average_cost_rmb <= budget * 0.8) {
          w *= 1.1;
        }

        return { ...r, weight: w };
      });
  }, [budget, maxDistance, userTags]);

  /* ──── Roulette Wheel Selection ──── */
  const getRandomRestaurant = useCallback((): ScoredRestaurant | null => {
    if (candidates.length === 0) return null;
    const total = candidates.reduce((s, c) => s + c.weight, 0);
    let rand = Math.random() * total;
    for (const c of candidates) {
      rand -= c.weight;
      if (rand <= 0) return c;
    }
    return candidates[candidates.length - 1];
  }, [candidates]);

  /* ──── 触发抽选 (含动画等待) ──── */
  const spin = useCallback(async () => {
    if (spinLock.current || candidates.length === 0) return;
    spinLock.current = true;
    setIsSpinning(true);
    setResult(null);

    await new Promise((resolve) => setTimeout(resolve, 2600));

    setResult(getRandomRestaurant());
    setIsSpinning(false);
    spinLock.current = false;
  }, [candidates.length, getRandomRestaurant]);

  const toggleTag = useCallback((tag: string) => {
    setUserTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);

  return {
    budget,
    setBudget,
    maxDistance,
    setMaxDistance,
    userTags,
    toggleTag,
    allTags,
    candidates,
    result,
    isSpinning,
    spin,
  };
}
