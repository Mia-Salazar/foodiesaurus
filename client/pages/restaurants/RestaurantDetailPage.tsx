import Link from "next/link";
import { FaArrowLeft, FaUtensils } from "react-icons/fa6";
import { formatScore } from "@/client/entities/restaurant/lib/formatScore";
import { RestaurantDetail } from "@/client/entities/restaurant/model/types";
import { AveragesSection } from "./_components/AveragesSection";
import { RestaurantInfo } from "./_components/RestaurantInfo";
import { RestaurantMap } from "./_components/RestaurantMap";
import { ReviewList } from "./_components/ReviewList";

export function RestaurantDetailPage({
  restaurant,
}: {
  restaurant: RestaurantDetail;
}) {
  const hasCoordinates =
    restaurant.latitude != null &&
    restaurant.longitude != null &&
    restaurant.latitude !== 0 &&
    restaurant.longitude !== 0;
  const resultsHref = `/restaurants?province=${encodeURIComponent(restaurant.province)}`;
  const reviewCount = restaurant.averages?.totalReviews ?? 0;

  return (
    <div className="bg-neutral-50">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-[56.25rem] px-4 py-8">
          <Link
            href={resultsHref}
            className="inline-flex items-center gap-2 text-sm text-foodiesaurus hover:opacity-80"
          >
            <FaArrowLeft aria-hidden />
            Volver a restaurantes
          </Link>

          <div className="mt-5 flex items-start justify-between gap-4">
            <div className="min-w-0">
              {restaurant.foodType && (
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
              <h1 className="m-0 font-teko text-4xl font-semibold tracking-wide md:text-5xl">
                {restaurant.name}
              </h1>
              <p className="mt-2 mb-0 text-sm text-neutral-500">
                {restaurant.province}
                {reviewCount > 0 && (
                  <>
                    {" · "}
                    {reviewCount} {reviewCount === 1 ? "opinión" : "opiniones"}
                  </>
                )}
              </p>
            </div>

            {restaurant.averages && (
              <p
                className="
                  m-0
                  flex
                  h-16
                  w-16
                  shrink-0
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
                  {formatScore(restaurant.averages.general)}
                </span>
                <span className="mt-0.5 text-[0.65rem] font-semibold">/10</span>
              </p>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[56.25rem] items-stretch gap-4 px-4 py-8 lg:grid-cols-2">
        <RestaurantInfo restaurant={restaurant} />
        {hasCoordinates && (
          <RestaurantMap
            name={restaurant.name}
            latitude={restaurant.latitude!}
            longitude={restaurant.longitude!}
          />
        )}
      </div>

      <section className="border-t border-neutral-200 bg-neutral-100 px-4 py-10">
        <div className="mx-auto max-w-[56.25rem] space-y-10">
          {restaurant.averages ? (
            <AveragesSection averages={restaurant.averages} />
          ) : (
            <p className="rounded-md border border-dashed border-neutral-300 bg-white px-4 py-8 text-center text-neutral-600">
              No hay puntuaciones medias para este restaurante
            </p>
          )}
          <ReviewList reviews={restaurant.reviews} />
        </div>
      </section>
    </div>
  );
}
