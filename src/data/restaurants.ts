import rawData from "../../data/restaurants.json";

export interface Restaurant {
  id: string;
  name: string;
  cluster_zone: string;
  location_coordinates: { lat: number; lng: number };
  price_tier: 1 | 2 | 3;
  average_cost_rmb: number;
  wait_time_minutes: number;
  vibe_tags: string[];
  cuisine_category: string;
  image_url: string;
}

export const restaurants: Restaurant[] = rawData as Restaurant[];
