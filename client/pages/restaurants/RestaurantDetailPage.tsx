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

  return (
    <div>
      <header className="mx-auto flex max-w-[56.25rem] items-center gap-2 px-4 pt-8 pb-4">
        <h1 className="m-0 flex-1 font-teko text-4xl font-semibold tracking-wide">
          {restaurant.name}
        </h1>
        {restaurant.averages && (
          <span
            className="
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded
              bg-foodiesaurus
              font-teko
              text-4xl
              font-semibold
              text-white
              leading-none
            "
          >
            {formatScore(restaurant.averages.general)}
          </span>
        )}
      </header>

      <RestaurantInfo restaurant={restaurant} />

      {hasCoordinates && (
        <RestaurantMap
          name={restaurant.name}
          latitude={restaurant.latitude!}
          longitude={restaurant.longitude!}
        />
      )}

      <section className="mt-8 bg-neutral-100 px-4 pt-8 pb-10">
        {restaurant.averages ? (
          <AveragesSection averages={restaurant.averages} />
        ) : (
          <p className="mx-auto max-w-[56.25rem] text-neutral-600">
            No hay puntuaciones medias para este restaurante
          </p>
        )}
        <div className="mt-10">
          <ReviewList reviews={restaurant.reviews} />
        </div>
      </section>
    </div>
  );
}
