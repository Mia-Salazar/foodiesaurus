import { FaMagnifyingGlass } from "react-icons/fa6";

export function RestaurantLookupIdle() {
  return (
    <section className="flex min-h-[50vh] flex-col items-center justify-center bg-white px-4 py-16 text-center">
      <span
        className="
          mb-6
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-md
          bg-foodiesaurus/10
          text-3xl
          text-foodiesaurus
        "
        aria-hidden
      >
        <FaMagnifyingGlass />
      </span>
      <h2 className="mt-0 mb-3 text-2xl font-semibold">Busca tu restaurante</h2>
      <p className="m-0 max-w-md text-neutral-800">
        Luego deja una puntuación.
      </p>
    </section>
  );
}
