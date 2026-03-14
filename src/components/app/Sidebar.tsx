"use client";

import { Compass, Trophy, Dices, Flame, User, Utensils } from "lucide-react";

const tabs = [
  { id: "discover", label: "🌍 发现", icon: Compass },
  { id: "playlists", label: "🏆 榜单", icon: Trophy },
  { id: "decision", label: "🎲 命运转盘", icon: Dices },
  { id: "match", label: "🔥 组局", icon: Flame },
  { id: "profile", label: "👤 我的", icon: User },
];

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="hidden md:flex flex-col w-56 lg:w-64 bg-white border-r border-gray-100 p-5 flex-shrink-0">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-200/40">
          <Utensils size={18} className="text-white" strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="font-bold text-gray-900 text-sm">大学城美食地图</h1>
          <p className="text-[10px] text-gray-400">松江大学城</p>
        </div>
      </div>

      <nav className="space-y-1.5">
        {tabs.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                active
                  ? "bg-orange-50 text-orange-600 shadow-sm"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <tab.icon
                size={18}
                strokeWidth={active ? 2.5 : 2}
              />
              {tab.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-gray-100">
        <p className="text-[10px] text-gray-300 text-center">
          MVP v1.0 · 产品演示
        </p>
      </div>
    </aside>
  );
}
