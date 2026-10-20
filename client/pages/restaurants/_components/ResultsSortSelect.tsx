"use client";

import {
  RESTAURANT_SORT_OPTIONS,
  RestaurantSort,
} from "@/client/features/search-restaurants/lib/sortRestaurants";

interface ResultsSortSelectProps {
  value: RestaurantSort;
  onChange: (value: RestaurantSort) => void;
}

export function ResultsSortSelect({ value, onChange }: ResultsSortSelectProps) {
  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="restaurant-sort"
        className="mb-0 font-bold text-foodiesaurus-secondary whitespace-nowrap"
      >
        Ordenar
      </label>
      <select
        id="restaurant-sort"
        className="min-h-11 rounded border border-neutral-300 bg-white p-2 text-black"
        value={value}
        onChange={(e) => onChange(e.target.value as RestaurantSort)}
      >
        {RESTAURANT_SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
