import { FaGlobe, FaLocationDot, FaPhone, FaUtensils } from "react-icons/fa6";
import { RestaurantDetail } from "@/client/entities/restaurant/model/types";

function hasValue(value?: string) {
  const trimmed = value?.trim();
  return Boolean(trimmed) && trimmed !== "0";
}

function toHref(url: string) {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

export function RestaurantInfo({ restaurant }: { restaurant: RestaurantDetail }) {
  const addressParts = [restaurant.address, restaurant.zip].filter(hasValue);

  return (
    <section className="mx-auto max-w-[56.25rem] space-y-3 px-4">
      <div className="grid grid-cols-[1.5rem_8.25rem_1fr] items-baseline gap-x-1">
        <FaLocationDot className="text-foodiesaurus" aria-hidden />
        <p className="m-0 font-bold">Dirección:</p>
        <div className="flex flex-col text-neutral-600">
          {addressParts.map((part) => (
            <span key={part}>{part}</span>
          ))}
          {hasValue(restaurant.province) && <span>{restaurant.province}</span>}
        </div>
      </div>

      {hasValue(restaurant.phone) && (
        <div className="grid grid-cols-[1.5rem_8.25rem_1fr] items-baseline gap-x-1">
          <FaPhone className="text-foodiesaurus" aria-hidden />
          <p className="m-0 font-bold">Teléfono:</p>
          <a
            href={`tel:${restaurant.phone}`}
            className="text-neutral-600 break-all hover:text-foodiesaurus"
          >
            {restaurant.phone}
          </a>
        </div>
      )}

      {hasValue(restaurant.url) && (
        <div className="grid grid-cols-[1.5rem_8.25rem_1fr] items-baseline gap-x-1">
          <FaGlobe className="text-foodiesaurus" aria-hidden />
          <p className="m-0 font-bold">Sitio web:</p>
          <a
            href={toHref(restaurant.url!)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foodiesaurus break-all underline hover:opacity-80"
          >
            {restaurant.url}
          </a>
        </div>
      )}

      {hasValue(restaurant.foodType) && (
        <div className="grid grid-cols-[1.5rem_8.25rem_1fr] items-baseline gap-x-1">
          <FaUtensils className="text-foodiesaurus" aria-hidden />
          <p className="m-0 font-bold">Tipo de comida:</p>
          <span className="text-neutral-600">{restaurant.foodType}</span>
        </div>
      )}
    </section>
  );
}
