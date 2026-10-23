import type { Metadata } from "next";
import { CreateManualRestaurantPage } from "@/client/pages/restaurants/CreateManualRestaurantPage";
import { requirePageSession } from "@/server/infraestructure/auth/require-session";

export const metadata: Metadata = {
  title: "Añadir restaurante a mano | Foodiesaurus",
  description: "Añade un restaurante escribiendo sus datos.",
};

export default async function Page() {
  await requirePageSession();
  return <CreateManualRestaurantPage />;
}
