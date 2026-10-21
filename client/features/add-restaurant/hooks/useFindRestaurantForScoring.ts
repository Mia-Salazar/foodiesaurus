"use client";

import { useRef, useState } from "react";
import { findRestaurantForScoring } from "../api/findRestaurantForScoring";
import { RestaurantLookupResult } from "../model/types";

export function useFindRestaurantForScoring() {
  const [result, setResult] = useState<RestaurantLookupResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  async function search(term: string) {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);
    setError(null);

    try {
      const data = await findRestaurantForScoring(term, controller.signal);
      if (controller.signal.aborted) return;
      setResult(data);
    } catch (e) {
      if (controller.signal.aborted) return;
      setError((e as Error).message);
      setResult(null);
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }

  return { result, loading, error, search };
}
