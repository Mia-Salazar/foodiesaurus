import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { CreateManualRestaurantForm } from "./_components/CreateManualRestaurantForm";

export function CreateManualRestaurantPage() {
  return (
    <div className="bg-neutral-50">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-[56.25rem] px-4 py-8">
          <Link
            href="/restaurants/create"
            className="inline-flex min-h-11 items-center gap-2 text-sm text-foodiesaurus hover:opacity-80"
          >
            <FaArrowLeft aria-hidden />
            Volver a añadir restaurante
          </Link>
          <h1 className="mt-5 mb-2 font-teko text-4xl font-semibold tracking-wide md:text-5xl">
            Añadir restaurante a mano
          </h1>
          <p className="m-0 max-w-xl text-neutral-800">
            Vas a escribir los datos del restaurante.
          </p>
        </div>
      </header>
      <CreateManualRestaurantForm />
    </div>
  );
}
