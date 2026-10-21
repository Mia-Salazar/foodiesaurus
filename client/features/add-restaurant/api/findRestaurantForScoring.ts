import { RestaurantLookupResult } from "../model/types";

export async function findRestaurantForScoring(
  term: string,
  signal?: AbortSignal,
): Promise<RestaurantLookupResult> {
  const params = new URLSearchParams({ term });
  const res = await fetch(`/api/restaurants/lookup?${params.toString()}`, { signal });

  if (res.status === 401) {
    throw new Error("Tienes que iniciar sesión para añadir un restaurante.");
  }
  if (!res.ok) {
    throw new Error("No hemos podido buscar. Prueba otra vez.");
  }

  const json = await res.json();
  return json.data;
}
