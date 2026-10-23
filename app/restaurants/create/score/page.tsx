import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AddDirectoryScorePage } from "@/client/pages/restaurants/AddDirectoryScorePage";
import { requirePageSession } from "@/server/infraestructure/auth/require-session";
import { directoryRestaurantQuerySchema } from "@/server/infraestructure/validators/add-directory-restaurant-score.validator";

export const metadata: Metadata = {
  title: "Añadir puntuación | Foodiesaurus",
  description: "Deja una puntuación sobre un restaurante.",
};

function readParam(value?: string | string[]) {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw?.trim() || undefined;
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requirePageSession();

  const params = await searchParams;
  const parsed = directoryRestaurantQuerySchema.safeParse({
    name: readParam(params.name),
    address: readParam(params.address),
    province: readParam(params.province),
    zip: readParam(params.zip),
    sourceId: readParam(params.sourceId),
    lat: readParam(params.lat),
    lng: readParam(params.lng),
  });
  if (!parsed.success) notFound();

  return (
    <AddDirectoryScorePage
      restaurant={{
        sourceId: parsed.data.sourceId ?? "",
        name: parsed.data.name,
        address: parsed.data.address,
        province: parsed.data.province,
        zip: parsed.data.zip,
        latitude: parsed.data.lat,
        longitude: parsed.data.lng,
      }}
    />
  );
}
