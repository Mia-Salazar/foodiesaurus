import { Restaurant } from "@/client/entities/restaurant/model/types";

export const RESTAURANT_SORT_OPTIONS = [
  { value: "name", label: "Nombre" },
  { value: "score-desc", label: "Puntuación: de más alta a más baja" },
  { value: "score-asc", label: "Puntuación: de más baja a más alta" },
] as const;

export type RestaurantSort = (typeof RESTAURANT_SORT_OPTIONS)[number]["value"];

export function isRestaurantSort(value: string | undefined): value is RestaurantSort {
  return RESTAURANT_SORT_OPTIONS.some((option) => option.value === value);
}

export function sortRestaurants(
  restaurants: Restaurant[],
  sort: RestaurantSort,
): Restaurant[] {
  const copy = [...restaurants];

  if (sort === "name") {
    return copy.sort((a, b) => a.name.localeCompare(b.name, "es"));
  }

  return copy.sort((a, b) => {
    const aMissing = a.score == null;
    const bMissing = b.score == null;

    if (aMissing && bMissing) return a.name.localeCompare(b.name, "es");
    if (aMissing) return 1;
    if (bMissing) return -1;

    const diff =
      sort === "score-asc"
        ? a.score! - b.score!
        : b.score! - a.score!;

    return diff !== 0 ? diff : a.name.localeCompare(b.name, "es");
  });
}
