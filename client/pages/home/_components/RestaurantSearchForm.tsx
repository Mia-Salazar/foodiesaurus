"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/client/shared/ui/atoms/Button";
import Input from "@/client/shared/ui/atoms/Input";
import { AVAILABLE_RESTAURANT_PROVINCES } from "@/client/entities/restaurant/restaurant.constants";

export default function RestaurantSearchForm() {
  const router = useRouter();
  const [selectedProvince, setSelectedProvince] = useState("Madrid");
  const [term, setTerm] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.set("province", selectedProvince);
    const trimmedTerm = term.trim();
    if (trimmedTerm) params.set("term", trimmedTerm);

    router.push(`/restaurants?${params.toString()}`);
  };

  return (
    <section className="bg-foodiesaurus px-4 py-10">
      <div className="mx-auto max-w-xl text-white">
        <h2 className="mb-6 text-center text-2xl font-bold text-white">
          Busca un restaurante
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Nombre</label>
            <Input
              id="name"
              name="name"
              placeholder="Ejemplo: Friki Pizza"
              isGhost
              maxLength={40}
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              aria-describedby="name-help"
            />
            <p id="name-help" className="m-0 text-sm text-white">
              Nombre del restaurante. Si no lo sabes, déjalo vacío.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <div className="flex min-w-0 flex-col gap-2">
              <label htmlFor="province">Provincia</label>
              <select
                required
                id="province"
                className="min-h-11 w-full rounded border border-gray-dark bg-white p-3 text-black"
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                aria-describedby="province-help"
              >
                {AVAILABLE_RESTAURANT_PROVINCES.map((province: string) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
            </div>

            <Button type="submit" className="min-h-12 md:!w-auto">
              Buscar
            </Button>
          </div>
          <p id="province-help" className="m-0 text-sm text-white">
            Elige la zona. Ahora hay Madrid, Barcelona y Sevilla.
          </p>
        </form>
      </div>
    </section>
  );
}
