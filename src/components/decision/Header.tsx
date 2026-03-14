"use client";

import { Utensils } from "lucide-react";

export function Header() {
  return (
    <header className="px-5 pt-14 pb-2 flex items-center gap-3">
      <div className="w-11 h-11 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-200/50">
        <Utensils size={20} className="text-white" strokeWidth={2.5} />
      </div>
      <div>
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">
          今天吃什么
        </h1>
        <p className="text-[11px] text-gray-400">
          松江大学城 · 美食决策引擎
        </p>
      </div>
    </header>
  );
}
