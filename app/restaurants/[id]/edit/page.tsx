import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ManualRestaurantPage } from "@/client/pages/restaurants/ManualRestaurantPage";
import { GetHandCreatedRestaurantUseCase } from "@/server/application/get-hand-created-restaurant/get-hand-created-restaurant.usecase";
import { requirePageSession } from "@/server/infraestructure/auth/require-session";
import { PrismaRestaurantRepository } from "@/server/infraestructure/repositories/prisma-restaurant.repository";
import { restaurantIdSchema } from "@/server/infraestructure/validators/get-restaurant-by-id.validator";

export const metadata: Metadata = {
  title: "Editar restaurante | Foodiesaurus",
  description: "Cambia los datos de un restaurante que has creado a mano.",
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await requirePageSession();
  const ownerId = session.user?.id;
  if (!ownerId) redirect("/login");

  const parsed = restaurantIdSchema.safeParse(await params);
  if (!parsed.success) notFound();

  const restaurant = await new GetHandCreatedRestaurantUseCase(
    new PrismaRestaurantRepository(),
  ).execute(parsed.data.id, ownerId);
  if (!restaurant) notFound();

  return (
    <ManualRestaurantPage
      restaurant={{
        id: restaurant.id,
        name: restaurant.name,
        province: restaurant.province,
        address: restaurant.address,
        zip: restaurant.zip,
        url: restaurant.url,
        phone: restaurant.phone,
        foodType: restaurant.foodType,
      }}
    />
  );
}
