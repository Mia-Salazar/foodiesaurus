"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import { RestaurantCard } from "@/client/entities/restaurant/ui/RestaurantCard";
import { useSearchRestaurants } from "@/client/features/search-restaurants/hooks/useRestaurantsByProvince";
import {
  RestaurantSort,
  sortRestaurants,
} from "@/client/features/search-restaurants/lib/sortRestaurants";
import Loader from "@/client/shared/ui/atoms/Loader";
import { ResultsSearchForm } from "./_components/ResultsSearchForm";
import { ResultsSortSelect } from "./_components/ResultsSortSelect";

interface RestaurantsPageProps {
  province?: string;
  term?: string;
  sort?: RestaurantSort;
}

export function RestaurantsPage({
  province,
  term,
  sort = "name",
}: RestaurantsPageProps) {
  const router = useRouter();
  const [selectedSort, setSelectedSort] = useState<RestaurantSort>(sort);
  const { restaurants, loading, error } = useSearchRestaurants(province, term);
  const title = province ? `Restaurantes en ${province}` : "Restaurantes";
  const sortedRestaurants = useMemo(
    () => sortRestaurants(restaurants, selectedSort),
    [restaurants, selectedSort],
  );

  useEffect(() => {
    setSelectedSort(sort);
  }, [sort]);

  const updateSort = (nextSort: RestaurantSort) => {
    setSelectedSort(nextSort);
    const params = new URLSearchParams();
    if (province) params.set("province", province);
    if (term) params.set("term", term);
    if (nextSort !== "name") params.set("sort", nextSort);
    router.replace(`/restaurants?${params.toString()}`);
  };

  return (
    <div className="bg-neutral-50">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-[56.25rem] px-4 py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-foodiesaurus hover:opacity-80"
          >
            <FaArrowLeft aria-hidden />
            Volver al inicio
          </Link>
          <h1 className="mt-5 mb-0 font-teko text-4xl font-semibold tracking-wide md:text-5xl">
            {title}
          </h1>
          {province && !loading && !error && (
            <p className="mt-2 mb-0 text-sm text-neutral-500">
              {restaurants.length}{" "}
              {restaurants.length === 1 ? "restaurante" : "restaurantes"}
              {term ? ` · Resultados para “${term}”` : ""}
            </p>
          )}
        </div>
      </header>

      <ResultsSearchForm province={province} term={term} sort={selectedSort} />

      <div className="mx-auto max-w-[56.25rem] space-y-6 px-4 py-8">
        {!province && (
          <p className="rounded-md border border-dashed border-neutral-300 bg-white px-4 py-8 text-center text-neutral-600">
            Elige una provincia para ver restaurantes.{" "}
            <Link href="/" className="text-foodiesaurus underline hover:opacity-80">
              Volver al inicio
            </Link>
          </p>
        )}

        {province && loading && (
          <div className="flex min-h-64 flex-col items-center justify-center gap-3 text-neutral-600">
            <Loader />
            <p>Buscando restaurantes...</p>
          </div>
        )}

        {province && error && (
          <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            {error}
          </p>
        )}

        {province && !loading && !error && restaurants.length === 0 && (
          <div className="rounded-md border border-dashed border-neutral-300 bg-white px-4 py-10 text-center">
            <h2 className="text-xl font-semibold">No se encontraron restaurantes</h2>
            <p className="mx-auto mt-2 max-w-md text-neutral-600">
              Prueba con otro nombre o provincia, o añade el restaurante si lo
              conoces.
            </p>
            <Link
              href="/restaurants/create"
              className="
                mt-5
                inline-flex
                items-center
                justify-center
                px-5
                py-2.5
                rounded
                font-bold
                text-sm
                h-10
                bg-foodiesaurus-secondary
                text-white
                hover:opacity-80
                transition
              "
            >
              Crear restaurante
            </Link>
          </div>
        )}

        {province && !loading && !error && restaurants.length > 0 && (
          <section>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="m-0 text-2xl font-semibold">
                Resultados{" "}
                <span className="font-teko text-3xl font-semibold text-foodiesaurus">
                  ({restaurants.length})
                </span>
              </h2>
              <ResultsSortSelect value={selectedSort} onChange={updateSort} />
            </div>
            <ul className="list-none space-y-4 p-0">
              {sortedRestaurants.map((restaurant) => (
                <li key={restaurant.id}>
                  <RestaurantCard restaurant={restaurant} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
