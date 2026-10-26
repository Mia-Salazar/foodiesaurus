import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { DeleteAccountButton } from "@/client/features/delete-account/ui/DeleteAccountButton";

export interface Profile {
  name?: string;
  email?: string;
  image?: string;
}

function countLabel(count: number, one: string, many: string) {
  return count === 1 ? one : many;
}

export function ProfilePage({
  profile,
  restaurantCount,
  scoreCount,
}: {
  profile: Profile;
  restaurantCount: number;
  scoreCount: number;
}) {
  const hasDetails = Boolean(profile.name || profile.email);

  return (
    <div className="bg-neutral-50">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-[56.25rem] px-4 py-8">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2 text-sm text-foodiesaurus hover:opacity-80"
          >
            <FaArrowLeft aria-hidden />
            Volver al inicio
          </Link>
          <h1 className="mt-5 mb-2 font-teko text-4xl font-semibold tracking-wide md:text-5xl">
            Tu perfil
          </h1>
          <p className="m-0 max-w-xl text-neutral-800">
            Aquí ves los datos de tu cuenta.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-[56.25rem] px-4 py-8">
        <section className="rounded-md border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="flex items-start gap-4">
            {profile.image && (
              <Image
                src={profile.image}
                alt=""
                width={96}
                height={96}
                className="h-24 w-24 shrink-0 rounded-full object-cover"
              />
            )}
            <div className="min-w-0">
              {hasDetails ? (
                <dl className="m-0 space-y-4 text-neutral-800">
                  {profile.name && (
                    <div>
                      <dt className="font-semibold">Nombre</dt>
                      <dd className="m-0 mt-1">{profile.name}</dd>
                    </div>
                  )}
                  {profile.email && (
                    <div>
                      <dt className="font-semibold">Correo</dt>
                      <dd className="m-0 mt-1">
                        <a
                          href={`mailto:${profile.email}`}
                          className="text-foodiesaurus underline"
                        >
                          {profile.email}
                        </a>
                      </dd>
                    </div>
                  )}
                </dl>
              ) : (
                <p className="m-0 text-neutral-800">
                  Tu cuenta no tiene nombre ni correo.
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <p className="m-0 rounded-md bg-foodiesaurus/10 px-3 py-1.5 text-sm text-neutral-800">
              <span className="font-semibold text-foodiesaurus">{restaurantCount}</span>{" "}
              {countLabel(restaurantCount, "restaurante a mano", "restaurantes a mano")}
            </p>
            <p className="m-0 rounded-md bg-foodiesaurus-secondary/10 px-3 py-1.5 text-sm text-neutral-800">
              <span className="font-semibold text-foodiesaurus-secondary">{scoreCount}</span>{" "}
              {countLabel(scoreCount, "opinión", "opiniones")}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/profile/restaurants"
              className="inline-flex min-h-11 items-center justify-center rounded bg-foodiesaurus-secondary px-5 py-2.5 text-sm font-bold text-white no-underline hover:opacity-80"
            >
              Mis restaurantes
            </Link>
            <Link
              href="/profile/scores"
              className="inline-flex min-h-11 items-center justify-center rounded border border-foodiesaurus-secondary px-5 py-2.5 text-sm font-bold text-foodiesaurus-secondary no-underline hover:opacity-80"
            >
              Mis opiniones
            </Link>
          </div>
          <DeleteAccountButton />
        </section>
      </div>
    </div>
  );
}
