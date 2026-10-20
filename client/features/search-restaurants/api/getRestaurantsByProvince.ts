import { Restaurant } from "@/client/entities/restaurant/model/types";

interface SearchParams {
  province: string;
  term?: string;
}

export async function searchRestaurants(
  { province, term }: SearchParams,
  signal?: AbortSignal,
): Promise<Restaurant[]> {
  const params = new URLSearchParams({ province });
  if (term) params.set("term", term);

  const res = await fetch(`/api/restaurants?${params.toString()}`, { signal });
  if (!res.ok) throw new Error("No se pudieron cargar los restaurantes");
  const json = await res.json();
  return json.data ?? [];
}