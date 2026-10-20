import { formatScore } from "@/client/entities/restaurant/lib/formatScore";
import { RestaurantReview } from "@/client/entities/restaurant/model/types";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("es-ES");
}

export function ReviewList({ reviews }: { reviews: RestaurantReview[] }) {
  return (
    <>
      <h3 className="mx-auto mb-8 max-w-[56.25rem] text-xl font-semibold">
        Comentarios ({reviews.length})
      </h3>
      {reviews.length === 0 ? (
        <p className="mx-auto max-w-[56.25rem] text-neutral-600">
          No hay comentarios para este restaurante
        </p>
      ) : (
        <ul className="mx-auto grid max-w-[56.25rem] list-none gap-5 p-0">
          {reviews.map((review) => (
            <li
              key={review.id}
              className="relative rounded-md border border-neutral-200 bg-white p-5"
            >
              <h4 className="pr-16 text-lg font-semibold text-foodiesaurus-secondary">
                {review.userName}
              </h4>
              <small className="mb-7 mt-1 block text-neutral-500">
                {formatDate(review.createdAt)}
              </small>
              <p
                className="
                  absolute
                  top-5
                  right-5
                  m-0
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded
                  bg-foodiesaurus
                  font-teko
                  text-2xl
                  font-semibold
                  text-white
                  leading-none
                "
              >
                {formatScore(review.generalScore)}
              </p>
              <p className="mt-2.5 text-sm text-neutral-600">
                <span className="font-bold text-black">¿Reacción alérgica?: </span>
                {review.allergicReaction ? "Sí" : "No"}
              </p>
              {review.allergenChart && (
                <p className="mt-2.5 text-sm text-neutral-600">
                  <span className="font-bold text-black">¿Carta de alérgenos?: </span>
                  Sí
                </p>
              )}
              <p className="mt-2.5 text-sm text-neutral-600">
                <span className="font-bold text-black">
                  Calidad de la carta de alérgenos:{" "}
                </span>
                {review.fidelityScore}/10
              </p>
              <p className="mt-2.5 text-sm text-neutral-600">
                <span className="font-bold text-black">Atención recibida: </span>
                {review.attentionScore}/10
              </p>
              {review.comment && (
                <p className="mt-2.5 text-sm text-neutral-700">{review.comment}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
