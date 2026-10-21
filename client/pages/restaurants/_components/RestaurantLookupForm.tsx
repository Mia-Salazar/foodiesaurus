"use client";

import { FormEvent } from "react";
import Button from "@/client/shared/ui/atoms/Button";
import Input from "@/client/shared/ui/atoms/Input";

export function RestaurantLookupForm({
  term,
  onTermChange,
  onSearch,
}: {
  term: string;
  onTermChange: (value: string) => void;
  onSearch: (term: string) => void;
}) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = term.trim();
    if (!name) return;
    onSearch(name);
  };

  return (
    <section className="bg-foodiesaurus px-4 py-10">
      <form className="mx-auto max-w-xl space-y-5 text-white" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="restaurant-name">Nombre</label>
          <Input
            id="restaurant-name"
            name="name"
            required
            placeholder="Ejemplo: Friki Pizza"
            isGhost
            maxLength={40}
            value={term}
            onChange={(event) => onTermChange(event.target.value)}
            aria-describedby="restaurant-name-help"
          />
          <p id="restaurant-name-help" className="m-0 text-sm text-white">
            Escribe el nombre del restaurante.
          </p>
        </div>

        <Button type="submit" className="min-h-12">
          Buscar
        </Button>
      </form>
    </section>
  );
}
