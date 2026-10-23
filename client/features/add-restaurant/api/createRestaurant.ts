import { Restaurant } from "@/client/entities/restaurant/model/types";

export interface NewRestaurantData {
  name: string;
  province: string;
  address: string;
  zip?: string;
  url?: string;
  phone?: string;
  foodType?: string;
}

export async function createRestaurant(
  restaurant: NewRestaurantData,
): Promise<Restaurant> {
  const res = await fetch("/api/restaurants", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(restaurant),
  });

  if (res.status === 401) {
    throw new Error("Tienes que iniciar sesión para añadir un restaurante.");
  }
  if (res.status === 400) {
    throw new Error("Revisa los datos del restaurante. Luego prueba otra vez.");
  }
  if (!res.ok) {
    throw new Error("No hemos podido guardar el restaurante. Prueba otra vez.");
  }

  const json = await res.json();
  return json.data;
}
