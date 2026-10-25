import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { formatScore } from "@/client/entities/restaurant/lib/formatScore";
import { Fact } from "@/client/entities/restaurant/ui/Fact";

export interface MyScore {
  id: number;
  restaurantId: number;
  restaurantName: string;
  createdAt: string;
  generalScore: number;
  allergenChart: boolean;
  fidelityScore: number;
  attentionScore: number;
  allergicReaction: boolean;
  comment?: string;
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function MyScoresPage({ scores }: { scores: MyScore[] }) {
  return (
    <div className="bg-neutral-50">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-[56.25rem] px-4 py-8">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2 text-sm text-foodiesaurus hover:opacity-80"
          >
            <FaArrowLeft aria-hidden />
            Volver al inicio
          </Link>
          <h1 className="mt-5 mb-2 font-teko text-4xl font-semibold tracking-wide md:text-5xl">
            Mis opiniones
          </h1>
          <p className="m-0 max-w-xl text-neutral-800">
            Aquí ves las opiniones que has dejado.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-[56.25rem] px-4 py-8">
        {scores.length === 0 ? (
          <section className="rounded-md border border-dashed border-neutral-300 bg-white px-4 py-8 text-center text-neutral-800">
            <h2 className="mt-0 mb-3 text-2xl font-semibold">
              Todavía no has dejado ninguna opinión
            </h2>
            <p className="mt-0 mb-6">Puedes buscar un restaurante y puntuarlo.</p>
            <Link
              href="/restaurants"
              className="inline-flex min-h-11 items-center justify-center rounded bg-foodiesaurus-secondary px-5 py-2.5 text-sm font-bold text-white no-underline hover:opacity-80"
            >
              Buscar restaurantes
            </Link>
          </section>
        ) : (
          <ul className="list-none space-y-4 p-0">
            {scores.map((score) => (
              <li key={score.id}>
                <article className="relative rounded-md border border-neutral-200 bg-white p-5 shadow-sm">
                  <div className="pr-20">
                    <h2 className="m-0 font-teko text-3xl font-semibold tracking-wide">
                      {score.restaurantName}
                    </h2>
                    <p className="mt-1 mb-4 text-sm text-neutral-800">
                      <time dateTime={score.createdAt}>{formatDate(score.createdAt)}</time>
                    </p>
                  </div>
                  <p
                    className="absolute top-5 right-5 m-0 flex h-16 w-16 flex-col items-center justify-center rounded bg-foodiesaurus text-white leading-none"
                    aria-label={`Puntuación general ${formatScore(score.generalScore)} de 10`}
                  >
                    <span className="font-teko text-[2rem] font-semibold" aria-hidden>
                      {formatScore(score.generalScore)}
                    </span>
                    <span className="mt-0.5 text-[0.65rem] font-semibold" aria-hidden>
                      /10
                    </span>
                  </p>
                  <ul className="mb-4 flex list-none flex-wrap gap-2 p-0">
                    <Fact
                      label="Carta de alérgenos"
                      value={score.allergenChart ? "Sí" : "No"}
                    />
                    {score.allergenChart && (
                      <Fact
                        label="Calidad de la carta"
                        value={`${score.fidelityScore}/10`}
                      />
                    )}
                    <Fact label="Atención" value={`${score.attentionScore}/10`} />
                    <Fact
                      label="Reacción alérgica"
                      value={score.allergicReaction ? "Sí" : "No"}
                    />
                  </ul>
                  {score.comment && (
                    <p className="m-0 border-l-2 border-foodiesaurus/40 pl-3 text-sm leading-relaxed text-neutral-800">
                      {score.comment}
                    </p>
                  )}
                  <Link
                    href={`/restaurants/${score.restaurantId}`}
                    className="mt-5 inline-flex min-h-11 items-center justify-center rounded bg-foodiesaurus-secondary px-5 py-2.5 text-sm font-bold text-white no-underline hover:opacity-80"
                  >
                    {`Ver ${score.restaurantName}`}
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
