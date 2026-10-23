export interface NewScoreData {
  hasAllergenChart: boolean;
  allergenChartQuality?: number;
  hadAllergicReaction: boolean;
  attentionScore: number;
  comment?: string;
}

export async function addScore(
  restaurantId: number,
  score: NewScoreData,
): Promise<void> {
  const res = await fetch(`/api/restaurants/${restaurantId}/scores`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(score),
  });

  if (res.status === 401) {
    throw new Error("Tienes que iniciar sesión para dejar una puntuación.");
  }
  if (res.status === 400) {
    throw new Error("Revisa tus respuestas. Luego prueba otra vez.");
  }
  if (res.status === 404) {
    throw new Error("No hemos encontrado este restaurante.");
  }
  if (!res.ok) {
    throw new Error("No hemos podido guardar la puntuación. Prueba otra vez.");
  }
}
