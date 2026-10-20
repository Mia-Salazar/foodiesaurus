import Link from "next/link";
import { FaLocationDot, FaPhone, FaUtensils } from "react-icons/fa6";
import { formatScore } from "../lib/formatScore";
import { Restaurant } from "../model/types";

export function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const location = [restaurant.address, restaurant.zip].filter(Boolean).join(", ");

  return (
    <article
      className="
        relative
        rounded-md
        border
        border-neutral-200
        bg-white
        p-4
        shadow-sm
        transition
        hover:border-foodiesaurus
        hover:shadow-md
        md:min-h-[11rem]
        md:pb-16
      "
    >
      <h2 className="pr-16 mb-3 text-xl font-semibold text-black">
        {restaurant.name}
      </h2>

      {restaurant.score != null && (
        <p
          className="
            absolute
            top-4
            right-4
            m-0
            flex
            h-14
            w-14
            flex-col
            items-center
            justify-center
            rounded
            bg-foodiesaurus
            text-white
            leading-none
          "
        >
          <span className="font-teko text-[1.75rem] font-semibold">
            {formatScore(restaurant.score)}
          </span>
          <span className="mt-0.5 text-[0.65rem] font-semibold">/10</span>
        </p>
      )}

      {restaurant.foodType && (
        <p className="mb-3">
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

      {(location || restaurant.province) && (
        <p className="mb-2 flex items-start gap-2 text-sm text-neutral-600">
          <FaLocationDot className="mt-0.5 shrink-0 text-foodiesaurus" aria-hidden />
          <span>
            {[location, restaurant.province].filter(Boolean).join(" · ")}
          </span>
        </p>
      )}

      {restaurant.phone && (
        <p className="mb-4 flex items-center gap-2 text-sm text-neutral-600 md:mb-0">
          <FaPhone className="shrink-0 text-foodiesaurus" aria-hidden />
          <span>{restaurant.phone}</span>
        </p>
      )}

      <Link
        href={`/restaurants/${restaurant.id}`}
        className="
          mt-4
          inline-flex
          items-center
          justify-center
          w-fit
          no-underline
          px-5
          py-2.5
          rounded
          font-bold
          text-sm
          bg-foodiesaurus-secondary
          text-white
          hover:opacity-80
          transition
          md:absolute
          md:bottom-4
          md:right-4
          md:mt-0
        "
      >
        Ver restaurante
      </Link>
    </article>
  );
}
