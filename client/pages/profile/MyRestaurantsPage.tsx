import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { Restaurant } from "@/client/entities/restaurant/model/types";
import { RestaurantCard } from "@/client/entities/restaurant/ui/RestaurantCard";

export function MyRestaurantsPage({
  restaurants,
}: {
  restaurants: Restaurant[];
}) {
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
            Mis restaurantes
          </h1>
          <div className="max-w-xl space-y-2 text-neutral-800">
            <p className="m-0">Solo ves los restaurantes que has creado a mano.</p>
            <p className="m-0">
              Si has puntuado un restaurante que ya estaba, no sale aquí.
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[56.25rem] px-4 py-8">
        {restaurants.length === 0 ? (
          <section className="rounded-md border border-dashed border-neutral-300 bg-white px-4 py-8 text-center text-neutral-800">
            <h2 className="mt-0 mb-3 text-2xl font-semibold">
              Todavía no has creado ningún restaurante a mano
            </h2>
            <p className="mt-0 mb-6">Puedes añadir uno ahora.</p>
            <Link
              href="/restaurants/create/manual"
              className="inline-flex min-h-11 items-center justify-center rounded bg-foodiesaurus-secondary px-5 py-2.5 text-sm font-bold text-white no-underline hover:opacity-80"
            >
              Añadir restaurante a mano
            </Link>
          </section>
        ) : (
          <ul className="list-none space-y-4 p-0">
            {restaurants.map((restaurant) => (
              <li key={restaurant.id}>
                <RestaurantCard restaurant={restaurant} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
