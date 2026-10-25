import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { ScoreDraft } from "@/client/features/add-score/api/addScore";
import { AddScoreForm } from "./_components/add-score/AddScoreForm";
import { EditScoreForm } from "./_components/add-score/EditScoreForm";

export function AddScorePage({
  restaurant,
  score,
}: {
  restaurant: { id: number; name: string };
  score?: ScoreDraft & { id: number };
}) {
  const editing = score != null;

  return (
    <div className="bg-neutral-50">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-[56.25rem] px-4 py-8">
          <Link
            href={editing ? "/profile/scores" : `/restaurants/${restaurant.id}`}
            className="inline-flex min-h-11 items-center gap-2 text-sm text-foodiesaurus hover:opacity-80"
          >
            <FaArrowLeft aria-hidden />
            {editing ? "Volver a mis opiniones" : `Volver a ${restaurant.name}`}
          </Link>
          <h1 className="mt-5 mb-2 font-teko text-4xl font-semibold tracking-wide md:text-5xl">
            {editing ? "Editar puntuación" : "Añadir puntuación"}
          </h1>
          <p className="m-0 max-w-xl text-neutral-800">
            {editing
              ? `Vas a cambiar tu puntuación de ${restaurant.name}.`
              : `Vas a puntuar ${restaurant.name}.`}
          </p>
        </div>
      </header>
      {score ? (
        <EditScoreForm scoreId={score.id} initial={score} />
      ) : (
        <AddScoreForm restaurantId={restaurant.id} />
      )}
    </div>
  );
}
