import { Restaurant } from "@/client/entities/restaurant/model/types";

export interface DirectoryRestaurantMatch {
  sourceId: string;
  name: string;
  address: string;
  province?: string;
  zip?: string;
  latitude?: number;
  longitude?: number;
}

export type RestaurantLookupResult =
  | { source: "catalog"; restaurants: Restaurant[] }
  | { source: "directory"; restaurants: DirectoryRestaurantMatch[] };
