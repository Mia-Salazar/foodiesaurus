import type { ReactNode } from "react";
import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";
import { hasValue } from "@/client/entities/restaurant/lib/hasValue";
import { Restaurant } from "@/client/entities/restaurant/model/types";
import {
  DirectoryRestaurantMatch,
  RestaurantLookupResult,
} from "@/client/features/add-restaurant/model/types";
import { InfoRow } from "@/client/entities/restaurant/ui/InfoRow";

const actionClassName = `
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
`;

function createScoreHrefForCatalogRestaurant(restaurantId: number) {
  return `/restaurants/${restaurantId}/scores/create`;
}

function createScoreHrefForDirectoryRestaurant(
  directoryRestaurant: DirectoryRestaurantMatch,
) {
  const params = new URLSearchParams({
    name: directoryRestaurant.name.slice(0, 40),
    address: directoryRestaurant.address.slice(0, 150),
  });
  if (hasValue(directoryRestaurant.province)) {
    params.set("province", directoryRestaurant.province.slice(0, 50));
  }
  if (hasValue(directoryRestaurant.zip)) {
    params.set("zip", directoryRestaurant.zip.slice(0, 10));
  }
  if (directoryRestaurant.sourceId) {
    params.set("sourceId", directoryRestaurant.sourceId.slice(0, 150));
  }
  if (directoryRestaurant.latitude != null) {
    params.set("lat", String(directoryRestaurant.latitude));
  }
  if (directoryRestaurant.longitude != null) {
    params.set("lng", String(directoryRestaurant.longitude));
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
      <Link href={createScoreHref} className={`mt-5 ${actionClassName}`}>
        {`Añadir puntuación a ${restaurantName}`}
      </Link>
    </article>
  );
}

function AddRestaurantManuallyLink() {
  return (
    <Link
      href="/restaurants/create/manual"
      className={actionClassName}
    >
      Añadir restaurante a mano
    </Link>
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
      <p className="mt-8 mb-4 text-neutral-800">
        Si no es ninguno, puedes añadirlo tú.
      </p>
      <AddRestaurantManuallyLink />
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
      <section className="rounded-md border border-dashed border-neutral-300 bg-white px-4 py-8 text-center text-neutral-800">
        <h2 className="mt-0 mb-3 text-2xl font-semibold">
          No hemos encontrado ese restaurante
        </h2>
        <p className="m-0">
          No está en Foodiesaurus. Tampoco está en los restaurantes de España.
        </p>
        <p className="mt-3 mb-6">Puedes añadirlo tú.</p>
        <AddRestaurantManuallyLink />
      </section>
    );
  }

  if (searchResult.source === "catalog") {
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
      {searchResult.restaurants.map((directoryRestaurant) => (
        <li key={directoryRestaurant.sourceId}>
          <RestaurantLookupCard
            restaurantName={directoryRestaurant.name}
            restaurantAddress={directoryRestaurant.address}
            createScoreHref={createScoreHrefForDirectoryRestaurant(
              directoryRestaurant,
            )}
          />
        </li>
      ))}
    </RestaurantLookupSection>
  );
}
