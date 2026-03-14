"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { CITIES, CityKey } from "@/data/mockData";

interface CitySelectorProps {
  value: CityKey;
  onChange: (city: CityKey) => void;
}

const cityKeys = Object.keys(CITIES) as CityKey[];

export function CitySelector({ value, onChange }: CitySelectorProps) {
  return (
    <div className="flex items-center gap-2.5 px-4 md:px-6 py-2 bg-white/80 backdrop-blur-sm border-b border-gray-100/60">
      <MapPin size={13} className="text-orange-400 flex-shrink-0" />
      <div className="flex gap-1 p-0.5 bg-gray-100 rounded-xl">
        {cityKeys.map((key) => (
          <button
            key={key}
            onClick={() => onChange(key)}
            className="relative px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
          >
            {value === key && (
              <motion.div
                layoutId="city-pill"
                className="absolute inset-0 bg-white rounded-lg shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className={`relative ${value === key ? "text-orange-600" : "text-gray-400"}`}>
              {CITIES[key].emoji} {CITIES[key].name}
            </span>
          </button>
        ))}
      </div>
      <span className="text-[10px] text-gray-400 ml-auto hidden sm:inline">
        {CITIES[value].description}
      </span>
    </div>
  );
}
