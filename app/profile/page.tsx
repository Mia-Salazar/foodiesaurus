import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ProfilePage } from "@/client/pages/profile/ProfilePage";
import { requirePageSession } from "@/server/infraestructure/auth/require-session";

export const metadata: Metadata = {
  title: "Tu perfil | Foodiesaurus",
  description: "Datos de tu cuenta.",
};

export default async function Page() {
  const session = await requirePageSession();
  const user = session.user;
  if (!user?.id) redirect("/login");

  return (
    <ProfilePage
      profile={{
        name: user.name ?? undefined,
        email: user.email ?? undefined,
        image: user.image ?? undefined,
      }}
    />
  );
}
