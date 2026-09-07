// client/features/search-restaurants/hooks/useSearchRestaurants.ts
"use client";
import { useState } from "react";
import { Restaurant } from "@/client/entities/restaurant/model/types";
import { searchRestaurants } from "../api/getRestaurantsByProvince";

export function useSearchRestaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (province: string, term?: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchRestaurants({ province, term });
      setRestaurants(data);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { restaurants, loading, error, search };
}