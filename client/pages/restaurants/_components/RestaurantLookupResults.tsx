import type { ReactNode } from "react";
import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";
import { hasValue } from "@/client/entities/restaurant/lib/hasValue";
import { Restaurant } from "@/client/entities/restaurant/model/types";
import {
  RestaurantLookupResult,
  SpainRestaurantMatch,
} from "@/client/features/add-restaurant/model/types";
import { InfoRow } from "@/client/entities/restaurant/ui/InfoRow";

function createScoreHrefForCatalogRestaurant(restaurantId: number) {
  return `/restaurants/${restaurantId}/scores/create`;
}

function createScoreHrefForSpainRestaurant(spainRestaurant: SpainRestaurantMatch) {
  const params = new URLSearchParams({
    name: spainRestaurant.name,
    address: spainRestaurant.address,
  });
  if (hasValue(spainRestaurant.province)) {
    params.set("province", spainRestaurant.province);
  }
  if (hasValue(spainRestaurant.zip)) {
    params.set("zip", spainRestaurant.zip);
  }
  if (spainRestaurant.sourceId) {
    params.set("sourceId", spainRestaurant.sourceId);
  }
  if (spainRestaurant.latitude != null) {
    params.set("lat", String(spainRestaurant.latitude));
  }
  if (spainRestaurant.longitude != null) {
    params.set("lng", String(spainRestaurant.longitude));
  }
  return `/restaurants/create/score?${params.toString()}`;
}

function formatCatalogRestaurantAddress(catalogRestaurant: Restaurant) {
  return [
    catalogRestaurant.address,
    catalogRestaurant.zip,
    catalogRestaurant.province,
  ]
    .filter(hasValue)
    .join(", ");
}

function RestaurantLookupCard({
  restaurantName,
  restaurantAddress,
  createScoreHref,
}: {
  restaurantName: string;
  restaurantAddress: string;
  createScoreHref: string;
}) {
  return (
    <article className="rounded-md border border-neutral-200 bg-white p-5 shadow-sm transition hover:border-foodiesaurus hover:shadow-md">
      <h3 className="mt-0 mb-3 text-xl font-semibold">{restaurantName}</h3>
      {hasValue(restaurantAddress) && (
        <InfoRow icon={<FaLocationDot />} label="Dirección">
          {restaurantAddress}
        </InfoRow>
      )}
      <Link
        href={createScoreHref}
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
        {`Añadir puntuación a ${restaurantName}`}
      </Link>
    </article>
  );
}

function RestaurantLookupSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-2 text-2xl font-semibold">{heading}</h2>
      <p className="mt-0 mb-6 text-neutral-800">
        Elige el restaurante. Luego vas a dejar una puntuación.
      </p>
      <ul className="list-none space-y-4 p-0">{children}</ul>
    </section>
  );
}

export function RestaurantLookupResults({
  searchResult,
}: {
  searchResult: RestaurantLookupResult;
}) {
  if (searchResult.restaurants.length === 0) {
    return (
      <p className="rounded-md border border-dashed border-neutral-300 bg-white px-4 py-8 text-center text-neutral-800">
        No hemos encontrado un restaurante con ese nombre. Prueba otro nombre.
      </p>
    );
  }

  if (searchResult.source === "ours") {
    return (
      <RestaurantLookupSection heading="Ya está en Foodiesaurus">
        {searchResult.restaurants.map((catalogRestaurant) => (
          <li key={catalogRestaurant.id}>
            <RestaurantLookupCard
              restaurantName={catalogRestaurant.name}
              restaurantAddress={formatCatalogRestaurantAddress(catalogRestaurant)}
              createScoreHref={createScoreHrefForCatalogRestaurant(
                catalogRestaurant.id,
              )}
            />
          </li>
        ))}
      </RestaurantLookupSection>
    );
  }

  return (
    <RestaurantLookupSection heading="Restaurantes de España con ese nombre">
      {searchResult.restaurants.map((spainRestaurant) => (
        <li key={spainRestaurant.sourceId}>
          <RestaurantLookupCard
            restaurantName={spainRestaurant.name}
            restaurantAddress={spainRestaurant.address}
            createScoreHref={createScoreHrefForSpainRestaurant(spainRestaurant)}
          />
        </li>
      ))}
    </RestaurantLookupSection>
  );
}
