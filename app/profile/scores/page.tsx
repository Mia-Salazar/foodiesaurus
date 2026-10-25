import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { MyScoresPage } from "@/client/pages/profile/MyScoresPage";
import { ListUserScoresUseCase } from "@/server/application/list-user-scores/list-user-scores.usecase";
import { requirePageSession } from "@/server/infraestructure/auth/require-session";
import { PrismaRestaurantRepository } from "@/server/infraestructure/repositories/prisma-restaurant.repository";

export const metadata: Metadata = {
  title: "Mis opiniones | Foodiesaurus",
  description: "Opiniones que has dejado en los restaurantes.",
};

export default async function Page() {
  const session = await requirePageSession();
  const userId = session.user?.id;
  if (!userId) redirect("/login");

  const scores = await new ListUserScoresUseCase(
    new PrismaRestaurantRepository(),
  ).execute(userId);

  return (
    <MyScoresPage
      scores={scores.map((score) => ({
        id: score.id,
        restaurantId: score.restaurantId,
        restaurantName: score.restaurantName,
        createdAt: score.createdAt.toISOString(),
        generalScore: score.generalScore,
        allergenChart: score.allergenChart === 1,
        fidelityScore: score.fidelityScore,
        attentionScore: score.attentionScore,
        allergicReaction: score.allergicReaction === 1,
        comment: score.comment,
      }))}
    />
  );
}
