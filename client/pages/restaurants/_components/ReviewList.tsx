import { formatScore } from "@/client/entities/restaurant/lib/formatScore";
import { RestaurantReview } from "@/client/entities/restaurant/model/types";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function Fact({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <li className="rounded bg-neutral-50 px-2.5 py-1 text-xs text-neutral-600">
      <span className="font-semibold text-neutral-800">{label}: </span>
      {value}
    </li>
  );
}

export function ReviewList({ reviews }: { reviews: RestaurantReview[] }) {
  return (
    <section>
      <h2 className="mb-6 text-2xl font-semibold">
        Comentarios{" "}
        <span className="font-teko text-3xl font-semibold text-foodiesaurus">
          ({reviews.length})
        </span>
      </h2>
      {reviews.length === 0 ? (
        <p className="rounded-md border border-dashed border-neutral-300 bg-white px-4 py-8 text-center text-neutral-600">
          No hay comentarios para este restaurante.
        </p>
      ) : (
        <ul className="grid list-none gap-4 p-0">
          {reviews.map((review) => (
            <li
              key={review.id}
              className="relative rounded-md border border-neutral-200 bg-white p-5 shadow-sm"
            >
              <div className="pr-16">
                <h3 className="m-0 text-lg font-semibold text-foodiesaurus-secondary">
                  {review.userName}
                </h3>
                <p className="mt-1 mb-4 text-sm text-neutral-500">
                  {formatDate(review.createdAt)}
                </p>
              </div>
              <p
                className="
                  absolute
                  top-5
                  right-5
                  m-0
                  flex
                  h-12
                  w-12
                  flex-col
                  items-center
                  justify-center
                  rounded
                  bg-foodiesaurus
                  text-white
                  leading-none
                "
              >
                <span className="font-teko text-2xl font-semibold">
                  {formatScore(review.generalScore)}
                </span>
                <span className="text-[0.6rem] font-semibold">/10</span>
              </p>
              <ul className="mb-4 flex list-none flex-wrap gap-2 p-0">
                <Fact
                  label="Reacción alérgica"
                  value={review.allergicReaction ? "Sí" : "No"}
                />
                {review.allergenChart && <Fact label="Carta de alérgenos" value="Sí" />}
                <Fact label="Calidad de la carta" value={`${review.fidelityScore}/10`} />
                <Fact label="Atención" value={`${review.attentionScore}/10`} />
              </ul>
              {review.comment && (
                <p className="m-0 border-l-2 border-foodiesaurus/40 pl-3 text-sm leading-relaxed text-neutral-700">
                  {review.comment}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
