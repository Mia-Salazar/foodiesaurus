"use client";

import { FormEvent, ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createRestaurant,
  NewRestaurantData,
} from "@/client/features/add-restaurant/api/createRestaurant";
import Button from "@/client/shared/ui/atoms/Button";
import Input from "@/client/shared/ui/atoms/Input";
import {
  FOOD_TYPES,
  RESTAURANT_PROVINCES,
} from "@/client/entities/restaurant/restaurant.constants";

const selectClassName =
  "min-h-11 rounded border border-gray-dark bg-white p-3 text-neutral-900";

function Field({
  id,
  label,
  help,
  children,
}: {
  id: string;
  label: string;
  help: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id}>{label}</label>
      {children}
      <p id={`${id}-help`} className="m-0 text-sm text-neutral-800">
        {help}
      </p>
    </div>
  );
}

function readTrimmedField(form: FormData, name: string) {
  return String(form.get(name) ?? "").trim();
}

function readRestaurantFromForm(form: FormData): NewRestaurantData {
  return {
    name: readTrimmedField(form, "name"),
    address: readTrimmedField(form, "address"),
    province: readTrimmedField(form, "province"),
    zip: readTrimmedField(form, "zip"),
    phone: readTrimmedField(form, "phone"),
    url: readTrimmedField(form, "url"),
    foodType: readTrimmedField(form, "foodType"),
  };
}

export function CreateManualRestaurantForm() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (saving) return;
    setSaving(true);
    setError(null);

    try {
      const restaurant = await createRestaurant(
        readRestaurantFromForm(new FormData(event.currentTarget)),
      );
      router.push(`/restaurants/${restaurant.id}/scores/create`);
    } catch (e) {
      setError((e as Error).message);
      setSaving(false);
    }
  };

  return (
    <section aria-labelledby="manual-restaurant-heading">
      <div className="bg-foodiesaurus px-4 py-10 text-white">
        <div className="mx-auto max-w-xl">
          <h2
            id="manual-restaurant-heading"
            className="mt-0 mb-3 text-2xl font-bold text-white"
          >
            Datos del restaurante
          </h2>
          <p className="m-0">
            Escribe cómo es el restaurante. Luego vas a dejar una puntuación.
          </p>
        </div>
      </div>

      <div className="bg-white px-4 py-10">
        <form
          className="mx-auto max-w-xl space-y-5 text-neutral-800"
          onSubmit={handleSubmit}
        >
          <Field
            id="manual-restaurant-name"
            label="Nombre"
            help="Escribe el nombre del restaurante. Es obligatorio."
          >
            <Input
              id="manual-restaurant-name"
              name="name"
              required
              autoComplete="organization"
              placeholder="Ejemplo: Friki Pizza"
              isGhost
              maxLength={40}
              aria-describedby="manual-restaurant-name-help"
              aria-required="true"
            />
          </Field>

          <Field
            id="manual-restaurant-address"
            label="Dirección"
            help="Escribe la calle y el número. Es obligatorio."
          >
            <Input
              id="manual-restaurant-address"
              name="address"
              required
              autoComplete="street-address"
              placeholder="Ejemplo: Calle de Alcántara, 71"
              isGhost
              maxLength={150}
              aria-describedby="manual-restaurant-address-help"
              aria-required="true"
            />
          </Field>

          <Field
            id="manual-restaurant-zip"
            label="Código postal"
            help="Los 5 números de la zona. Si no los sabes, déjalo vacío."
          >
            <Input
              id="manual-restaurant-zip"
              name="zip"
              inputMode="numeric"
              autoComplete="postal-code"
              placeholder="Ejemplo: 28006"
              isGhost
              maxLength={10}
              pattern="[0-9]{5}"
              title="Escribe 5 números. Por ejemplo, 28006."
              aria-describedby="manual-restaurant-zip-help"
            />
          </Field>

          <Field
            id="manual-restaurant-province"
            label="Provincia"
            help="Provincia es la zona. Elige una. Es obligatorio."
          >
            <select
              id="manual-restaurant-province"
              name="province"
              required
              className={selectClassName}
              defaultValue=""
              aria-describedby="manual-restaurant-province-help"
              aria-required="true"
            >
              <option value="" disabled>
                Elige una provincia
              </option>
              {RESTAURANT_PROVINCES.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </Field>

          <Field
            id="manual-restaurant-phone"
            label="Teléfono"
            help="El número de teléfono. Si no lo sabes, déjalo vacío."
          >
            <Input
              id="manual-restaurant-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="Ejemplo: 915764534"
              isGhost
              maxLength={30}
              aria-describedby="manual-restaurant-phone-help"
            />
          </Field>

          <Field
            id="manual-restaurant-url"
            label="Sitio web"
            help="La página del restaurante en internet. Si no la tiene, déjalo vacío."
          >
            <Input
              id="manual-restaurant-url"
              name="url"
              autoComplete="url"
              placeholder="Ejemplo: https://www.frikipizza.com"
              isGhost
              maxLength={100}
              aria-describedby="manual-restaurant-url-help"
            />
          </Field>

          <Field
            id="manual-restaurant-food-type"
            label="Tipo de comida"
            help="Qué tipo de comida sirven. Si no lo sabes, déjalo vacío."
          >
            <select
              id="manual-restaurant-food-type"
              name="foodType"
              className={selectClassName}
              defaultValue=""
              aria-describedby="manual-restaurant-food-type-help"
            >
              <option value="">No lo sé</option>
              {FOOD_TYPES.map((foodType) => (
                <option key={foodType} value={foodType}>
                  {foodType}
                </option>
              ))}
            </select>
          </Field>

          {error && (
            <p
              className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-red-800"
              role="alert"
            >
              {error}
            </p>
          )}

          {saving && (
            <p className="m-0" role="status" aria-live="polite">
              Guardando el restaurante.
            </p>
          )}

          <Button type="submit" className="min-h-12">
            Añadir restaurante
          </Button>
        </form>
      </div>
    </section>
  );
}
