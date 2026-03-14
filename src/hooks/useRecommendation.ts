"use client";

import { useState, useMemo, useCallback } from "react";
import { Restaurant } from "@/data/restaurants";
import { getTopPick, getRecommendations } from "@/lib/recommendation";

export function useRecommendation(restaurants: Restaurant[]) {
  const [refreshKey, setRefreshKey] = useState(0);

  const topPick = useMemo(() => {
    void refreshKey;
    return getTopPick(restaurants);
  }, [restaurants, refreshKey]);

  const trending = useMemo(() => restaurants, [restaurants]);

  const recommendations = useMemo(() => {
    void refreshKey;
    return getRecommendations(restaurants, 4);
  }, [restaurants, refreshKey]);

  const refreshTopPick = useCallback(() => setRefreshKey((k) => k + 1), []);

  return { topPick, trending, recommendations, refreshTopPick };
}
