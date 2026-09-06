import { Restaurant } from "@/client/entities/restaurant/model/types";

export async function getRestaurantsByProvince(province: string): Promise<Restaurant[]> {
  const res = await fetch(`/api/restaurants?province=${encodeURIComponent(province)}`);
  if (!res.ok) throw new Error("Failed to fetch restaurants");
  const json = await res.json();
  return json.data;
}