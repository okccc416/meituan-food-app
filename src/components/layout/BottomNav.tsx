"use client";

import { Home, Compass, Heart, User } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

const navItems = [
  { href: "/", icon: Home, label: "首页" },
  { href: "/explore", icon: Compass, label: "探索" },
  { href: "#", icon: Heart, label: "收藏" },
  { href: "#", icon: User, label: "我的" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30">
      <div className="max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-gray-100 pb-safe">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href) && item.href !== "#";

            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex flex-col items-center gap-0.5 relative min-w-[48px]"
              >
                <motion.div
                  whileTap={{ scale: 0.85 }}
                  className={
                    isActive ? "text-orange-500" : "text-gray-400"
                  }
                >
                  <item.icon
                    size={22}
                    strokeWidth={isActive ? 2.5 : 1.8}
                  />
                </motion.div>
                <span
                  className={`text-[10px] ${
                    isActive
                      ? "text-orange-500 font-semibold"
                      : "text-gray-400"
                  }`}
                >
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="nav-dot"
                    className="absolute -top-1 w-1 h-1 rounded-full bg-orange-500"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
