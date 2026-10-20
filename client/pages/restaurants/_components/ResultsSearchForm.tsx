"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/client/shared/ui/atoms/Button";
import Input from "@/client/shared/ui/atoms/Input";
import { AVAILABLE_RESTAURANT_PROVINCES } from "@/client/pages/entities/restaurant/restaurant.constants.trestaurant.constants";

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
            placeholder="Nombre restaurante"
            isGhost
            maxLength={40}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="results-province" className="text-sm text-white">
            Provincia
          </label>
          <select
            required
            id="results-province"
            className="rounded border border-gray-dark bg-white p-3 text-black"
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
          >
            {AVAILABLE_RESTAURANT_PROVINCES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <Button type="submit" className="h-[48px] md:w-auto">
          Buscar
        </Button>
      </form>
    </section>
  );
}
