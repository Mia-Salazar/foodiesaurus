"use client";

import { useRouter } from "next/navigation";
import { ScoreDraft, updateScore } from "@/client/features/add-score/api/addScore";
import { ScoreForm } from "./ScoreForm";

export function EditScoreForm({
  scoreId,
  initial,
}: {
  scoreId: number;
  initial: ScoreDraft;
}) {
  const router = useRouter();

  return (
    <ScoreForm
      editing
      initial={initial}
      onSave={async (score) => {
        await updateScore(scoreId, score);
        router.push("/profile/scores");
      }}
    />
  );
}
