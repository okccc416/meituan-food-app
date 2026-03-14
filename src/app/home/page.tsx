"use client";

import { useState } from "react";
import { Sidebar } from "@/components/app/Sidebar";
import { MobileNav } from "@/components/app/MobileNav";
import { DiscoverView } from "@/components/app/DiscoverView";
import { PlaylistsView } from "@/components/app/PlaylistsView";
import { DecisionView } from "@/components/app/DecisionView";
import { MatchView } from "@/components/app/MatchView";
import { ProfileView } from "@/components/app/ProfileView";
import { RestaurantDetail } from "@/components/app/RestaurantDetail";
import { LivePulse } from "@/components/app/LivePulse";
import { CitySelector } from "@/components/app/CitySelector";
import { MockRestaurant, CityKey } from "@/data/mockData";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("discover");
  const [city, setCity] = useState<CityKey>("songjiang");
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<MockRestaurant | null>(null);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <LivePulse />
        {activeTab !== "profile" && (
          <CitySelector value={city} onChange={setCity} />
        )}

        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
          {activeTab === "discover" && (
            <DiscoverView city={city} onSelect={setSelectedRestaurant} />
          )}
          {activeTab === "playlists" && (
            <PlaylistsView city={city} onSelect={setSelectedRestaurant} />
          )}
          {activeTab === "decision" && <DecisionView city={city} />}
          {activeTab === "match" && <MatchView city={city} />}
          {activeTab === "profile" && <ProfileView />}
        </main>
      </div>

      <MobileNav activeTab={activeTab} onTabChange={setActiveTab} />

      <RestaurantDetail
        restaurant={selectedRestaurant}
        onClose={() => setSelectedRestaurant(null)}
      />
    </div>
  );
}
