import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { MyRestaurantsPage } from "@/client/pages/profile/MyRestaurantsPage";
import { ListHandCreatedRestaurantsUseCase } from "@/server/application/list-hand-created-restaurants/list-hand-created-restaurants.usecase";
import { requirePageSession } from "@/server/infraestructure/auth/require-session";
import { PrismaRestaurantRepository } from "@/server/infraestructure/repositories/prisma-restaurant.repository";

export const metadata: Metadata = {
  title: "Mis restaurantes | Foodiesaurus",
  description: "Restaurantes que has creado a mano.",
};

export default async function Page() {
  const session = await requirePageSession();
  const userId = session.user?.id;
  if (!userId) redirect("/login");

  const restaurants = await new ListHandCreatedRestaurantsUseCase(
    new PrismaRestaurantRepository(),
  ).execute(userId);

  return (
    <MyRestaurantsPage
      restaurants={restaurants.map((restaurant) => ({
        id: restaurant.id,
        name: restaurant.name,
        province: restaurant.province,
        address: restaurant.address,
        zip: restaurant.zip,
        url: restaurant.url,
        phone: restaurant.phone,
        foodType: restaurant.foodType,
        latitude: restaurant.latitude,
        longitude: restaurant.longitude,
        score: restaurant.score,
      }))}
    />
  );
}
