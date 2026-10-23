import { NewScoreData } from "./addScore";

export interface DirectoryRestaurantScore extends NewScoreData {
  name: string;
  province: string;
  address: string;
  zip?: string;
  apiId?: string;
  latitude?: number;
  longitude?: number;
}

export async function saveRestaurantWithScore(
  score: DirectoryRestaurantScore,
): Promise<{ id: number }> {
  const res = await fetch("/api/restaurants/with-score", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(score),
  });

  if (res.status === 401) {
    throw new Error("Tienes que iniciar sesión para dejar una puntuación.");
  }
  if (res.status === 400) {
    throw new Error("Revisa los datos. Luego prueba otra vez.");
  }
  if (!res.ok) {
    throw new Error("No hemos podido guardar la puntuación. Prueba otra vez.");
  }

  const json = await res.json();
  return json.data;
}
