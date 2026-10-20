import type { ReactNode } from "react";
import { RestaurantAverages } from "@/client/entities/restaurant/model/types";
import { ScoreBar } from "./ScoreBar";

function AverageBox({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-md border border-neutral-200 bg-white p-5">
      <h4 className="mb-4 text-lg font-semibold">{title}</h4>
      {children}
    </div>
  );
}

export function AveragesSection({ averages }: { averages: RestaurantAverages }) {
  return (
    <>
      <h3 className="mx-auto mb-8 max-w-[56.25rem] text-xl font-semibold">
        Puntuaciones ({averages.totalReviews})
      </h3>
      <div className="mx-auto mb-8 grid max-w-[56.25rem] gap-4 md:grid-cols-2">
        <AverageBox title="Puntuaciones generales">
          <ul className="mb-6 list-disc space-y-2 pl-5 text-sm text-neutral-600">
            <li>La puntuación general se calcula teniendo en cuenta todos los puntos</li>
            <li>
              La atención recibida hace referencia a cómo nos ha tratado el personal
              una vez conoció nuestras alergias o intolerancias
            </li>
          </ul>
          <div className="space-y-5">
            <ScoreBar label="General" value={averages.general} />
            <ScoreBar label="Atención del personal" value={averages.attention} />
          </div>
        </AverageBox>

        <AverageBox title="Carta de alérgenos">
          <ul className="mb-6 list-disc space-y-2 pl-5 text-sm text-neutral-600">
            <li>En este punto comprobamos si el restaurante tiene carta de alérgenos</li>
            <li>
              Si el local lo tiene, observamos si ésta se corresponde con la comida
              que se recibe
            </li>
          </ul>
          <div className="space-y-5">
            <ScoreBar
              label="Visitas en las que hubo carta de alérgenos"
              value={averages.allergenChartPercent}
              max={100}
            />
            <ScoreBar label="Calidad de la carta" value={averages.fidelity} />
          </div>
        </AverageBox>

        <AverageBox title="Reacciones alérgicas">
          <ul className="mb-6 list-disc space-y-2 pl-5 text-sm text-neutral-600">
            <li>
              Aquí medimos si alguna persona ha tenido una reacción alérgica o
              reacción adversa tras comer en el local
            </li>
            <li>Las reacciones alérgicas son el valor con mayor peso en el cálculo general</li>
          </ul>
          <ScoreBar
            label="Porcentaje de reacciones"
            value={averages.allergicReactionPercent}
            max={100}
          />
        </AverageBox>
      </div>
    </>
  );
}
