import type { ReactNode } from "react";
import { FaGlobe, FaLocationDot, FaPhone, FaUtensils } from "react-icons/fa6";
import { hasValue } from "@/client/entities/restaurant/lib/hasValue";
import { RestaurantDetail } from "@/client/entities/restaurant/model/types";

function toHref(url: string) {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <span
        className="
          mt-0.5
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-md
          bg-foodiesaurus/10
          text-foodiesaurus
        "
        aria-hidden
      >
        {icon}
      </span>
      <div className="min-w-0">
        <p className="m-0 text-xs font-semibold uppercase tracking-wide text-neutral-500">
          {label}
        </p>
        <div className="mt-0.5 text-sm text-neutral-800 break-words">{children}</div>
      </div>
    </div>
  );
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
              Visitar web
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
