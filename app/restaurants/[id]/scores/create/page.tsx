import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AddScorePage } from "@/client/pages/restaurants/AddScorePage";
import { GetRestaurantByIdUseCase } from "@/server/application/get-restaurant-by-id/get-restaurant-by-id.usecase";
import { requirePageSession } from "@/server/infraestructure/auth/require-session";
import { PrismaRestaurantRepository } from "@/server/infraestructure/repositories/prisma-restaurant.repository";
import { restaurantIdSchema } from "@/server/infraestructure/validators/get-restaurant-by-id.validator";

export const metadata: Metadata = {
  title: "Añadir puntuación | Foodiesaurus",
  description: "Deja una puntuación sobre un restaurante.",
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requirePageSession();

  const parsed = restaurantIdSchema.safeParse(await params);
  if (!parsed.success) notFound();

  const useCase = new GetRestaurantByIdUseCase(new PrismaRestaurantRepository());
  const restaurant = await useCase.execute(parsed.data.id);
  if (!restaurant) notFound();

  return (
    <AddScorePage restaurant={{ id: restaurant.id, name: restaurant.name }} />
  );
}
