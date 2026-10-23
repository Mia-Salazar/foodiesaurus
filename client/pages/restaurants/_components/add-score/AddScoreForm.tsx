"use client";

import { useRouter } from "next/navigation";
import { addScore } from "@/client/features/add-score/api/addScore";
import { ScoreForm } from "./ScoreForm";

export function AddScoreForm({ restaurantId }: { restaurantId: number }) {
  const router = useRouter();

  return (
    <ScoreForm
      onSave={async (score) => {
        await addScore(restaurantId, score);
        router.push(`/restaurants/${restaurantId}`);
      }}
    />
  );
}
