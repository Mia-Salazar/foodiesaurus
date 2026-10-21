import type { Metadata } from "next";
import { CreateRestaurantPage } from "@/client/pages/restaurants/CreateRestaurantPage";
import { requirePageSession } from "@/server/infraestructure/auth/require-session";

export const metadata: Metadata = {
  title: "Añadir restaurante | Foodiesaurus",
  description: "Busca un restaurante por su nombre para dejar una nota.",
};

export default async function Page() {
  await requirePageSession();
  return <CreateRestaurantPage />;
}
