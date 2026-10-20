"use client";

import { useEffect, useState } from "react";
import { Restaurant } from "@/client/entities/restaurant/model/types";
import { searchRestaurants } from "../api/getRestaurantsByProvince";

export function useSearchRestaurants(province?: string, term?: string) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(Boolean(province));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!province) {
      setRestaurants([]);
      setLoading(false);
      setError(null);
      return;
    }

    const selectedProvince = province;
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const data = await searchRestaurants(
          { province: selectedProvince, term },
          controller.signal,
        );
        setRestaurants(data);
      } catch (e) {
        if (controller.signal.aborted) return;
        setError((e as Error).message);
        setRestaurants([]);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();

    return () => controller.abort();
  }, [province, term]);

  return { restaurants, loading, error };
}
