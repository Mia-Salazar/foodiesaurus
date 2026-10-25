import Link from "next/link";
import { FaLocationDot, FaPhone, FaUtensils } from "react-icons/fa6";
import { formatScore } from "../lib/formatScore";
import { hasValue } from "../lib/hasValue";
import { Restaurant } from "../model/types";
import { InfoRow } from "./InfoRow";

export function RestaurantCard({
  restaurant,
  editHref,
}: {
  restaurant: Restaurant;
  editHref?: string;
}) {
  const address = [restaurant.address, restaurant.zip, restaurant.province]
    .filter(hasValue)
    .join(", ");

  return (
    <article className="relative rounded-md border border-neutral-200 bg-white p-5 shadow-sm transition hover:border-foodiesaurus hover:shadow-md">
      <div className="pr-20">
        {hasValue(restaurant.foodType) && (
          <p className="mb-2">
            <span
              className="
                inline-flex
                items-center
                gap-1.5
                rounded
                bg-foodiesaurus-secondary/10
                px-2
                py-1
                text-xs
                font-semibold
                text-foodiesaurus-secondary
              "
            >
              <FaUtensils aria-hidden />
              {restaurant.foodType}
            </span>
          </p>
        )}
        <h2 className="m-0 font-teko text-3xl font-semibold tracking-wide">
          {restaurant.name}
        </h2>
      </div>

      {restaurant.score != null && (
        <p
          className="
            absolute
            top-5
            right-5
            m-0
            flex
            h-16
            w-16
            flex-col
            items-center
            justify-center
            rounded
            bg-foodiesaurus
            text-white
            leading-none
          "
        >
          <span className="font-teko text-[2rem] font-semibold">
            {formatScore(restaurant.score)}
          </span>
          <span className="mt-0.5 text-[0.65rem] font-semibold">/10</span>
        </p>
      )}

      <div className="mt-4 space-y-3">
        {address && (
          <InfoRow icon={<FaLocationDot />} label="Dirección">
            {address}
          </InfoRow>
        )}
        {hasValue(restaurant.phone) && (
          <InfoRow icon={<FaPhone />} label="Teléfono">
            {restaurant.phone}
          </InfoRow>
        )}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          href={`/restaurants/${restaurant.id}`}
          className="
            inline-flex
            items-center
            justify-center
            w-fit
            no-underline
            px-5
            min-h-11
            py-2.5
            rounded
            font-bold
            text-sm
            bg-foodiesaurus-secondary
            text-white
            hover:opacity-80
            transition
          "
        >
          {`Ver ${restaurant.name}`}
        </Link>
        {editHref && (
          <Link
            href={editHref}
            className="
              inline-flex
              items-center
              justify-center
              w-fit
              no-underline
              px-5
              min-h-11
              py-2.5
              rounded
              border
              border-foodiesaurus-secondary
              font-bold
              text-sm
              text-foodiesaurus-secondary
              hover:opacity-80
              transition
            "
          >
            {`Editar ${restaurant.name}`}
          </Link>
        )}
      </div>
    </article>
  );
}
