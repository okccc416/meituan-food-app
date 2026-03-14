"use client";

import { motion } from "framer-motion";
import { Compass, Trophy, Dices, Flame, User } from "lucide-react";

const tabs = [
  { id: "discover", label: "发现", icon: Compass, emoji: "🌍" },
  { id: "playlists", label: "榜单", icon: Trophy, emoji: "🏆" },
  { id: "decision", label: "转盘", icon: Dices, emoji: "🎲" },
  { id: "match", label: "组局", icon: Flame, emoji: "🔥" },
  { id: "profile", label: "我的", icon: User, emoji: "👤" },
];

interface MobileNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function MobileNav({ activeTab, onTabChange }: MobileNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 z-30 pb-safe">
      <div className="flex justify-around items-center h-16 px-4">
        {tabs.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center gap-0.5 min-w-[56px] relative"
            >
              <motion.div
                whileTap={{ scale: 0.85 }}
                className={active ? "text-orange-500" : "text-gray-400"}
              >
                <tab.icon
                  size={22}
                  strokeWidth={active ? 2.5 : 1.8}
                />
              </motion.div>
              <span
                className={`text-[10px] ${
                  active
                    ? "text-orange-500 font-semibold"
                    : "text-gray-400"
                }`}
              >
                {tab.label}
              </span>
              {active && (
                <motion.div
                  layoutId="mob-nav-dot"
                  className="absolute -top-1 w-1 h-1 rounded-full bg-orange-500"
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 30,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
