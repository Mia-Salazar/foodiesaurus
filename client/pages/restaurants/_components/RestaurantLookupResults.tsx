import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";
import { hasValue } from "@/client/entities/restaurant/lib/hasValue";
import { Restaurant } from "@/client/entities/restaurant/model/types";
import {
  RestaurantLookupResult,
  SpainRestaurantMatch,
} from "@/client/features/add-restaurant/model/types";
import { InfoRow } from "@/client/entities/restaurant/ui/InfoRow";

function oursHref(id: number) {
  return `/restaurants/${id}/scores/create`;
}

function spainHref(restaurant: SpainRestaurantMatch) {
  const params = new URLSearchParams({
    name: restaurant.name,
    address: restaurant.address,
  });
  if (hasValue(restaurant.province)) params.set("province", restaurant.province);
  if (hasValue(restaurant.zip)) params.set("zip", restaurant.zip);
  if (restaurant.sourceId) params.set("sourceId", restaurant.sourceId);
  if (restaurant.latitude != null) params.set("lat", String(restaurant.latitude));
  if (restaurant.longitude != null) params.set("lng", String(restaurant.longitude));
  return `/restaurants/create/score?${params.toString()}`;
}

function oursAddress(restaurant: Restaurant) {
  return [restaurant.address, restaurant.zip, restaurant.province]
    .filter(hasValue)
    .join(", ");
}

function ChoiceCard({
  name,
  address,
  href,
}: {
  name: string;
  address: string;
  href: string;
}) {
  return (
    <article className="rounded-md border border-neutral-200 bg-white p-5 shadow-sm transition hover:border-foodiesaurus hover:shadow-md">
      <h3 className="mt-0 mb-3 text-xl font-semibold">{name}</h3>
      {hasValue(address) && (
        <InfoRow icon={<FaLocationDot />} label="Dirección">
          {address}
        </InfoRow>
      )}
      <Link
        href={href}
        className="
          mt-5
          inline-flex
          min-h-11
          items-center
          justify-center
          rounded
          bg-foodiesaurus-secondary
          px-5
          py-2.5
          text-sm
          font-bold
          text-white
          no-underline
          transition
          hover:opacity-80
        "
      >
        {`Añadir nota a ${name}`}
      </Link>
    </article>
  );
}

function ResultsList({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-2 text-2xl font-semibold">{title}</h2>
      <p className="mt-0 mb-6 text-neutral-800">
        Elige el restaurante. Luego vas a dejar una nota.
      </p>
      <ul className="list-none space-y-4 p-0">{children}</ul>
    </section>
  );
}

export function RestaurantLookupResults({
  result,
}: {
  result: RestaurantLookupResult;
}) {
  if (result.restaurants.length === 0) {
    return (
      <p className="rounded-md border border-dashed border-neutral-300 bg-white px-4 py-8 text-center text-neutral-800">
        No hemos encontrado un restaurante con ese nombre. Prueba otro nombre.
      </p>
    );
  }

  if (result.source === "ours") {
    return (
      <ResultsList title="Ya está en Foodiesaurus">
        {result.restaurants.map((restaurant) => (
          <li key={restaurant.id}>
            <ChoiceCard
              name={restaurant.name}
              address={oursAddress(restaurant)}
              href={oursHref(restaurant.id)}
            />
          </li>
        ))}
      </ResultsList>
    );
  }

  return (
    <ResultsList title="Restaurantes de España con ese nombre">
      {result.restaurants.map((restaurant) => (
        <li key={restaurant.sourceId}>
          <ChoiceCard
            name={restaurant.name}
            address={restaurant.address}
            href={spainHref(restaurant)}
          />
        </li>
      ))}
    </ResultsList>
  );
}
