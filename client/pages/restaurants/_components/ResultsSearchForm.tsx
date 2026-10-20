"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/client/shared/ui/atoms/Button";
import Input from "@/client/shared/ui/atoms/Input";
import { AVAILABLE_RESTAURANT_PROVINCES } from "@/client/entities/restaurant/restaurant.constants";

interface ResultsSearchFormProps {
  province?: string;
  term?: string;
  sort?: string;
}

export function ResultsSearchForm({ province, term, sort }: ResultsSearchFormProps) {
  const router = useRouter();
  const [selectedProvince, setSelectedProvince] = useState(province ?? "Madrid");
  const [name, setName] = useState(term ?? "");

  useEffect(() => {
    setSelectedProvince(province ?? "Madrid");
    setName(term ?? "");
  }, [province, term]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.set("province", selectedProvince);
    const trimmedTerm = name.trim();
    if (trimmedTerm) params.set("term", trimmedTerm);
    if (sort && sort !== "name") params.set("sort", sort);

    router.push(`/restaurants?${params.toString()}`);
  };

  return (
    <section className="bg-foodiesaurus px-4 py-6">
      <form
        onSubmit={handleSubmit}
        className="mx-auto grid max-w-[56.25rem] gap-3 md:grid-cols-[1fr_12rem_auto] md:items-end"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="results-name" className="text-sm text-white">
            Nombre
          </label>
          <Input
            id="results-name"
            name="name"
            placeholder="Ejemplo: Friki Pizza"
            isGhost
            maxLength={40}
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-describedby="results-name-help"
          />
          <p id="results-name-help" className="m-0 text-sm text-white">
            Nombre del restaurante. Si no lo sabes, déjalo vacío.
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="results-province" className="text-sm text-white">
            Provincia
          </label>
          <select
            required
            id="results-province"
            className="min-h-11 rounded border border-gray-dark bg-white p-3 text-black"
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            aria-describedby="results-province-help"
          >
            {AVAILABLE_RESTAURANT_PROVINCES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <p id="results-province-help" className="m-0 text-sm text-white">
            Elige la zona. Ahora hay Madrid, Barcelona y Sevilla.
          </p>
        </div>

        <Button type="submit" className="min-h-12 md:w-auto">
          Buscar
        </Button>
      </form>
    </section>
  );
}
