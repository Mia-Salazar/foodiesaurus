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
          <h4 className="m-0 text-lg font-semibold">{title}</h4>
          <p className="mt-1 mb-0 text-sm text-neutral-500">{description}</p>
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
          description="La general combina todos los puntos. La atención valora el trato del personal al conocer las alergias."
        >
          <ScoreBar label="General" value={averages.general} />
          <ScoreBar label="Atención del personal" value={averages.attention} />
        </AverageBox>

        <AverageBox
          icon={<FaBookOpen />}
          title="Carta de alérgenos"
          description="Si el local tiene carta de alérgenos y si se corresponde con la comida que se recibe."
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
          description="Es el valor con más peso. Mide si alguien tuvo una reacción adversa tras comer aquí."
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
