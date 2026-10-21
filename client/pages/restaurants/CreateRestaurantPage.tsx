"use client";

import { useState } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { useFindRestaurantForScoring } from "@/client/features/add-restaurant/hooks/useFindRestaurantForScoring";
import Loader from "@/client/shared/ui/atoms/Loader";
import { RestaurantLookupForm } from "./_components/RestaurantLookupForm";
import { RestaurantLookupResults } from "./_components/RestaurantLookupResults";

export function CreateRestaurantPage() {
  const [term, setTerm] = useState("");
  const { result, loading, error, search } = useFindRestaurantForScoring();

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
            Añadir restaurante
          </h1>
          <div className="max-w-xl space-y-2 text-neutral-800">
            <p className="m-0">Busca el restaurante por su nombre.</p>
            <p className="m-0">
              Si ya está en Foodiesaurus, vas a dejar una puntuación.
            </p>
            <p className="m-0">
              Si no está, te enseñamos restaurantes de España con ese nombre.
            </p>
          </div>
        </div>
      </header>

      <RestaurantLookupForm term={term} onTermChange={setTerm} onSearch={search} />

      <div className="mx-auto max-w-[56.25rem] space-y-6 px-4 py-8">
        {loading && (
          <div
            className="flex min-h-64 flex-col items-center justify-center gap-3 text-neutral-800"
            role="status"
            aria-live="polite"
          >
            <Loader />
            <p>Buscando restaurantes.</p>
          </div>
        )}

        {error && (
          <p
            className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-red-800"
            role="alert"
          >
            {error}
          </p>
        )}

        {!loading && !error && result && (
          <RestaurantLookupResults result={result} />
        )}
      </div>
    </div>
  );
}
