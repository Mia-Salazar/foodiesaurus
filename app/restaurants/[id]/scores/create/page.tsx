import type { Metadata } from "next";
import { CreateScorePage } from "@/client/pages/restaurants/CreateScorePage";
import { requirePageSession } from "@/server/infraestructure/auth/require-session";

export const metadata: Metadata = {
  title: "Añadir nota | Foodiesaurus",
  description: "Deja una nota sobre un restaurante.",
};

export default async function Page() {
  await requirePageSession();
  return <CreateScorePage />;
}
