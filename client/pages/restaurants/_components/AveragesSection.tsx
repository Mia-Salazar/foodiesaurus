import type { ReactNode } from "react";
import { FaBookOpen, FaHeartPulse, FaStar } from "react-icons/fa6";
import { RestaurantAverages } from "@/client/entities/restaurant/model/types";
import { ScoreBar } from "./ScoreBar";

function AverageBox({
  icon,
  title,
  description,
  children,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-md border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-start gap-3">
        <span
          className="
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
        <div>
          <h3 className="m-0 text-lg font-semibold">{title}</h3>
          <p className="mt-1 mb-0 text-sm leading-relaxed text-neutral-700">{description}</p>
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

export function AveragesSection({ averages }: { averages: RestaurantAverages }) {
  return (
    <section>
      <h2 className="mb-6 text-2xl font-semibold">
        Puntuaciones{" "}
        <span className="font-teko text-3xl font-semibold text-foodiesaurus">
          ({averages.totalReviews})
        </span>
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        <AverageBox
          icon={<FaStar />}
          title="Puntuaciones generales"
          description="La puntuación general junta todos los puntos. La atención mira cómo te trata el personal si dices que tienes alergia."
        >
          <ScoreBar label="General" value={averages.general} />
          <ScoreBar label="Atención del personal" value={averages.attention} />
        </AverageBox>

        <AverageBox
          icon={<FaBookOpen />}
          title="Carta de alérgenos"
          description="La carta de alérgenos es la lista de ingredientes que pueden dar alergia. Aquí ves si el local la tiene y si encaja con la comida."
        >
          <ScoreBar
            label="Visitas con carta de alérgenos"
            value={averages.allergenChartPercent}
            max={100}
          />
          <ScoreBar label="Calidad de la carta" value={averages.fidelity} />
        </AverageBox>

        <AverageBox
          icon={<FaHeartPulse />}
          title="Reacciones alérgicas"
          description="Esta puntuación pesa más que las otras. Dice si alguien se puso malo después de comer aquí."
        >
          <ScoreBar
            label="Porcentaje de reacciones"
            value={averages.allergicReactionPercent}
            max={100}
          />
        </AverageBox>
      </div>
    </section>
  );
}
