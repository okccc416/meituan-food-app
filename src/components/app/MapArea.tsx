"use client";

import dynamic from "next/dynamic";
import { Map } from "lucide-react";
import { MockRestaurant } from "@/data/mockData";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-br from-emerald-50 via-blue-50 to-sky-50 flex flex-col items-center justify-center gap-2">
      <Map size={32} className="text-gray-300 animate-pulse" />
      <p className="text-xs text-gray-400">地图加载中...</p>
    </div>
  ),
});

interface MapAreaProps {
  restaurants: MockRestaurant[];
  center: [number, number];
  zoom?: number;
  onSelect?: (r: MockRestaurant) => void;
}

export function MapArea({ restaurants, center, zoom = 14, onSelect }: MapAreaProps) {
  return (
    <div className="rounded-2xl overflow-hidden border border-gray-100 h-72 lg:h-[540px]">
      <LeafletMap
        restaurants={restaurants}
        center={center}
        zoom={zoom}
        onSelect={onSelect}
      />
    </div>
  );
}
