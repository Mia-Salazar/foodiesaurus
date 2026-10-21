import { Restaurant } from "@/client/entities/restaurant/model/types";

export interface SpainRestaurantMatch {
  sourceId: string;
  name: string;
  address: string;
  province?: string;
  zip?: string;
  latitude?: number;
  longitude?: number;
}

export type RestaurantLookupResult =
  | { source: "ours"; restaurants: Restaurant[] }
  | { source: "spain"; restaurants: SpainRestaurantMatch[] };
