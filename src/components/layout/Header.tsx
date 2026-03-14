"use client";

import { MapPin } from "lucide-react";
import { getTimeGreeting } from "@/lib/recommendation";

export function Header() {
  const { greeting, subtitle } = getTimeGreeting();

  return (
    <header className="px-5 pt-14 pb-2">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{greeting}</h1>
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        </div>
        <div className="flex items-center gap-1 bg-orange-50 text-orange-500 px-3 py-1.5 rounded-full">
          <MapPin size={14} />
          <span className="text-xs font-semibold">大学城</span>
        </div>
      </div>
    </header>
  );
}
