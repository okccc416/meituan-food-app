"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, MapPin, ShieldCheck } from "lucide-react";
import { mockRestaurants, MockRestaurant, CityKey, CITIES } from "@/data/mockData";

const STICKER_ROTATIONS = [-2, 1.5, -1, 2.5, -0.5];

const playlists = [
  {
    id: "morning",
    title: "☕️ 早八人的救赎",
    subtitle: "快捷出餐 · 提神续命 · 课前补给",
    scene: "morning",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    id: "budget",
    title: "💰 穷鬼快乐餐",
    subtitle: "人均20以内 · 量大管饱 · 月底友好",
    scene: "budget",
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    id: "healthy",
    title: "💪 健身狂人专区",
    subtitle: "高蛋白 · 低卡轻食 · 增肌减脂",
    scene: "healthy",
    gradient: "from-blue-400 to-indigo-500",
  },
  {
    id: "gathering",
    title: "🎉 周末社团聚餐",
    subtitle: "火锅 · 串串 · 日料 · AA友好",
    scene: "gathering",
    gradient: "from-rose-400 to-pink-500",
  },
  {
    id: "latenight",
    title: "🌙 深夜emo食堂",
    subtitle: "高碳水 · 寝室宵夜 · 深夜破防必备",
    scene: "latenight",
    gradient: "from-indigo-400 to-purple-500",
  },
];

function PlaylistCard({
  restaurant,
  index,
  onSelect,
}: {
  restaurant: MockRestaurant;
  index: number;
  onSelect?: (r: MockRestaurant) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08, type: "spring", stiffness: 200 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onSelect?.(restaurant)}
      className="flex-shrink-0 w-48 md:w-56 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="relative h-28 md:h-32">
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          fill
          sizes="224px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-[10px] font-bold text-orange-500 px-2 py-0.5 rounded-full">
          ¥{restaurant.avgPrice}
        </div>
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full pl-1 pr-1.5 py-0.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
          </span>
          <span className="text-[8px] text-white/90">
            {restaurant.current_viewers}人看
          </span>
        </div>
      </div>
      <div className="p-3">
        <div className="flex items-center gap-1">
          <h4 className="font-bold text-sm text-gray-900 truncate">{restaurant.name}</h4>
          {restaurant.hygiene_rating === "A" && (
            <span className="flex items-center gap-0.5 bg-emerald-50 text-emerald-600 px-1 py-px rounded text-[7px] font-bold flex-shrink-0">
              <ShieldCheck size={7} /> A
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 mt-1 text-[10px] text-gray-400">
          <span className="flex items-center gap-0.5"><Clock size={9} />{restaurant.walkMinutes}min</span>
          <span className="text-gray-200">·</span>
          <span className="flex items-center gap-0.5"><MapPin size={9} />{restaurant.zone}</span>
        </div>
        <div className="flex gap-1 mt-2 flex-wrap">
          {restaurant.emoji_tags.slice(0, 1).map((tag, i) => (
            <span
              key={tag}
              style={{ transform: `rotate(${STICKER_ROTATIONS[i % STICKER_ROTATIONS.length]}deg)` }}
              className="inline-block text-[8px] bg-amber-50 border border-amber-100/80 text-amber-700 px-1.5 py-0.5 rounded-lg"
            >
              {tag}
            </span>
          ))}
          {restaurant.mbti_tags.slice(0, 1).map((tag) => (
            <span key={tag} className="inline-block text-[8px] bg-violet-50 border border-violet-100/80 text-violet-600 px-1.5 py-0.5 rounded-lg">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

interface PlaylistsViewProps {
  city: CityKey;
  onSelect?: (r: MockRestaurant) => void;
}

export function PlaylistsView({ city, onSelect }: PlaylistsViewProps) {
  const cityRestaurants = mockRestaurants.filter((r) => r.city === city);

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
        🏆 场景化智能榜单
      </h2>
      <p className="text-sm text-gray-400 mb-6">
        {CITIES[city].name} · 为你的大学节律量身定制
      </p>

      {playlists.map((pl) => {
        const items = cityRestaurants.filter((r) => r.scenes.includes(pl.scene));
        if (items.length === 0) return null;
        return (
          <section key={pl.id} className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-1 h-8 rounded-full bg-gradient-to-b ${pl.gradient}`} />
              <div>
                <h3 className="text-base md:text-lg font-bold text-gray-900">{pl.title}</h3>
                <p className="text-[11px] text-gray-400">{pl.subtitle}</p>
              </div>
            </div>
            <div className="flex gap-3 md:gap-4 overflow-x-auto pb-3 scrollbar-hide -mx-4 px-4 md:-mx-6 md:px-6">
              {items.map((r, i) => (
                <PlaylistCard key={r.id} restaurant={r} index={i} onSelect={onSelect} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
