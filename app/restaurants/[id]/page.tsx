import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { RestaurantDetailPage } from "@/client/pages/restaurants/RestaurantDetailPage";
import { GetHandCreatedRestaurantUseCase } from "@/server/application/get-hand-created-restaurant/get-hand-created-restaurant.usecase";
import { GetRestaurantByIdUseCase } from "@/server/application/get-restaurant-by-id/get-restaurant-by-id.usecase";
import { PrismaRestaurantRepository } from "@/server/infraestructure/repositories/prisma-restaurant.repository";

const getRestaurantDetail = cache(async (id: number) => {
  const repository = new PrismaRestaurantRepository();
  const useCase = new GetRestaurantByIdUseCase(repository);
  return useCase.execute(id);
});

function parseId(raw: string): number | null {
  const id = Number(raw);
  if (!Number.isInteger(id) || id <= 0) return null;
  return id;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id: raw } = await params;
  const id = parseId(raw);
  if (!id) return { title: "Restaurante no encontrado | Foodiesaurus" };

  const restaurant = await getRestaurantDetail(id);
  if (!restaurant) return { title: "Restaurante no encontrado | Foodiesaurus" };

  return {
    title: `${restaurant.name} | Foodiesaurus`,
    description: `Opiniones y puntuación de ${restaurant.name} en ${restaurant.province} para personas con alergias e intolerancias.`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: raw } = await params;
  const id = parseId(raw);
  if (!id) notFound();

  const restaurant = await getRestaurantDetail(id);
  if (!restaurant) notFound();

  const ownerId = (await auth())?.user?.id;
  const editable = ownerId
    ? await new GetHandCreatedRestaurantUseCase(
        new PrismaRestaurantRepository(),
      ).execute(id, ownerId)
    : null;

  return (
    <RestaurantDetailPage restaurant={restaurant} canEdit={editable != null} />
  );
}
