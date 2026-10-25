import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { AddScorePage } from "@/client/pages/restaurants/AddScorePage";
import { GetUserScoreUseCase } from "@/server/application/get-user-score/get-user-score.usecase";
import { requirePageSession } from "@/server/infraestructure/auth/require-session";
import { PrismaRestaurantRepository } from "@/server/infraestructure/repositories/prisma-restaurant.repository";
import { restaurantIdSchema } from "@/server/infraestructure/validators/get-restaurant-by-id.validator";

export const metadata: Metadata = {
  title: "Editar puntuación | Foodiesaurus",
  description: "Cambia una puntuación que has dejado.",
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await requirePageSession();
  const userId = session.user?.id;
  if (!userId) redirect("/login");

  const parsed = restaurantIdSchema.safeParse(await params);
  if (!parsed.success) notFound();

  const score = await new GetUserScoreUseCase(
    new PrismaRestaurantRepository(),
  ).execute(parsed.data.id, userId);
  if (!score) notFound();

  return (
    <AddScorePage
      restaurant={{ id: score.restaurantId, name: score.restaurantName }}
      score={{
        id: score.id,
        hasAllergenChart: score.allergenChart === 1,
        allergenChartQuality:
          score.allergenChart === 1 && score.fidelityScore >= 1
            ? score.fidelityScore
            : undefined,
        hadAllergicReaction:
          score.allergicReaction == null ? undefined : score.allergicReaction === 1,
        attentionScore: score.attentionScore,
        comment: score.comment,
      }}
    />
  );
}
