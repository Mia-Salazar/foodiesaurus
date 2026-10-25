import type { Metadata } from "next";
import { ManualRestaurantPage } from "@/client/pages/restaurants/ManualRestaurantPage";
import { requirePageSession } from "@/server/infraestructure/auth/require-session";

export const metadata: Metadata = {
  title: "Añadir restaurante a mano | Foodiesaurus",
  description: "Añade un restaurante escribiendo sus datos.",
};

export default async function Page() {
  await requirePageSession();
  return <ManualRestaurantPage />;
}
