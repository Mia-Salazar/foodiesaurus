"use client";
import { useState } from "react";
import { Restaurant } from "@/client/entities/restaurant/model/types";
import { getRestaurantsByProvince } from "../api/getRestaurantsByProvince";

export function useRestaurantsByProvince() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (province: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRestaurantsByProvince(province);
      setRestaurants(data);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { restaurants, loading, error, search };
}