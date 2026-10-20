import { FaGlobe, FaLocationDot, FaPhone, FaUtensils } from "react-icons/fa6";
import { hasValue } from "@/client/entities/restaurant/lib/hasValue";
import { RestaurantDetail } from "@/client/entities/restaurant/model/types";
import { InfoRow } from "@/client/entities/restaurant/ui/InfoRow";

function toHref(url: string) {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

export function RestaurantInfo({ restaurant }: { restaurant: RestaurantDetail }) {
  const addressParts = [restaurant.address, restaurant.zip, restaurant.province].filter(
    hasValue,
  );

  return (
    <section className="rounded-md border border-neutral-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">Datos del restaurante</h2>
      <div className="space-y-4">
        <InfoRow icon={<FaLocationDot />} label="Dirección">
          {addressParts.join(", ")}
        </InfoRow>

        {hasValue(restaurant.phone) && (
          <InfoRow icon={<FaPhone />} label="Teléfono">
            <a
              href={`tel:${restaurant.phone}`}
              className="text-neutral-800 hover:text-foodiesaurus"
            >
              {restaurant.phone}
            </a>
          </InfoRow>
        )}

        {hasValue(restaurant.url) && (
          <InfoRow icon={<FaGlobe />} label="Sitio web">
            <a
              href={toHref(restaurant.url!)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foodiesaurus underline hover:opacity-80"
            >
              Visitar la web de {restaurant.name}
            </a>
          </InfoRow>
        )}

        {hasValue(restaurant.foodType) && (
          <InfoRow icon={<FaUtensils />} label="Tipo de comida">
            {restaurant.foodType}
          </InfoRow>
        )}
      </div>
    </section>
  );
}
