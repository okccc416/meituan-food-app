"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MockRestaurant } from "@/data/mockData";

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({ iconRetinaUrl: "", iconUrl: "", shadowUrl: "" });

const orangeIcon = L.divIcon({
  className: "",
  html: `<div style="width:28px;height:28px;border-radius:50% 50% 50% 4px;background:linear-gradient(135deg,#f97316,#ef4444);border:2.5px solid white;box-shadow:0 2px 8px rgba(0,0,0,.25);transform:rotate(-45deg)"></div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -30],
});

function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    map.flyTo(center, zoom, { duration: 1.5 });
  }, [map, center, zoom]);

  return null;
}

interface LeafletMapProps {
  restaurants: MockRestaurant[];
  center: [number, number];
  zoom: number;
  onSelect?: (r: MockRestaurant) => void;
}

export default function LeafletMap({ restaurants, center, zoom, onSelect }: LeafletMapProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className="w-full h-full z-0"
      zoomControl={false}
      attributionControl={false}
    >
      <ChangeView center={center} zoom={zoom} />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {restaurants.map((r) => (
        <Marker
          key={r.id}
          position={[r.coordinates.lat, r.coordinates.lng]}
          icon={orangeIcon}
        >
          <Popup>
            <div className="p-2 min-w-[180px]">
              <h4 className="font-bold text-sm text-gray-900">{r.name}</h4>
              <p className="text-[10px] text-gray-400 mt-0.5">{r.cuisine} · {r.zone}</p>
              <div className="flex items-center gap-2 mt-1.5 text-xs">
                <span className="font-bold text-orange-500">¥{r.avgPrice}/人</span>
                <span className="text-gray-300">|</span>
                <span className="text-gray-500">步行{r.walkMinutes}min</span>
              </div>
              {onSelect && (
                <button
                  onClick={(e) => { e.stopPropagation(); onSelect(r); }}
                  className="mt-2 w-full text-[11px] font-bold text-white bg-orange-500 hover:bg-orange-600 rounded-lg py-1.5 transition-colors"
                >
                  查看详情 →
                </button>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
