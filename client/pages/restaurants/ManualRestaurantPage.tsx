import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { NewRestaurantData } from "@/client/features/add-restaurant/api/createRestaurant";
import { CreateManualRestaurantForm } from "./_components/CreateManualRestaurantForm";

export function ManualRestaurantPage({
  restaurant,
}: {
  restaurant?: NewRestaurantData & { id: number };
}) {
  const editing = restaurant != null;

  return (
    <div className="bg-neutral-50">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-[56.25rem] px-4 py-8">
          <Link
            href={editing ? `/restaurants/${restaurant.id}` : "/restaurants/create"}
            className="inline-flex min-h-11 items-center gap-2 text-sm text-foodiesaurus hover:opacity-80"
          >
            <FaArrowLeft aria-hidden />
            {editing ? `Volver a ${restaurant.name}` : "Volver a añadir restaurante"}
          </Link>
          <h1 className="mt-5 mb-2 font-teko text-4xl font-semibold tracking-wide md:text-5xl">
            {editing ? "Editar restaurante" : "Añadir restaurante a mano"}
          </h1>
          <p className="m-0 max-w-xl text-neutral-800">
            {editing
              ? "Vas a cambiar los datos del restaurante."
              : "Vas a escribir los datos del restaurante."}
          </p>
        </div>
      </header>
      <CreateManualRestaurantForm restaurant={restaurant} />
    </div>
  );
}
