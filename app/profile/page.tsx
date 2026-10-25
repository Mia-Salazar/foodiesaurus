import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ProfilePage } from "@/client/pages/profile/ProfilePage";
import { ListHandCreatedRestaurantsUseCase } from "@/server/application/list-hand-created-restaurants/list-hand-created-restaurants.usecase";
import { ListUserScoresUseCase } from "@/server/application/list-user-scores/list-user-scores.usecase";
import { requirePageSession } from "@/server/infraestructure/auth/require-session";
import { PrismaRestaurantRepository } from "@/server/infraestructure/repositories/prisma-restaurant.repository";

export const metadata: Metadata = {
  title: "Tu perfil | Foodiesaurus",
  description: "Datos de tu cuenta.",
};

export default async function Page() {
  const session = await requirePageSession();
  const user = session.user;
  if (!user?.id) redirect("/login");

  const repository = new PrismaRestaurantRepository();
  const [restaurants, scores] = await Promise.all([
    new ListHandCreatedRestaurantsUseCase(repository).execute(user.id),
    new ListUserScoresUseCase(repository).execute(user.id),
  ]);

  return (
    <ProfilePage
      profile={{
        name: user.name ?? undefined,
        email: user.email ?? undefined,
        image: user.image ?? undefined,
      }}
      restaurantCount={restaurants.length}
      scoreCount={scores.length}
    />
  );
}
