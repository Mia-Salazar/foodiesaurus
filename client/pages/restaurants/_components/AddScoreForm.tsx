"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { addScore, NewScoreData } from "@/client/features/add-score/api/addScore";
import Button from "@/client/shared/ui/atoms/Button";

const selectClassName =
  "min-h-11 rounded border border-gray-dark bg-white p-3 text-neutral-900";

const SCORES = Array.from({ length: 10 }, (_, index) => index + 1);

function YesNoQuestion({
  name,
  legend,
  onChange,
}: {
  name: string;
  legend: string;
  onChange?: (yes: boolean) => void;
}) {
  return (
    <fieldset className="m-0 border-0 p-0">
      <legend className="mb-2">{legend}</legend>
      <div className="flex gap-6">
        {[
          { value: "yes", label: "Sí" },
          { value: "no", label: "No" },
        ].map((option) => (
          <label
            key={option.value}
            className="flex min-h-11 items-center gap-2"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              required
              className="h-5 w-5 accent-foodiesaurus"
              onChange={() => onChange?.(option.value === "yes")}
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function ScoreSelect({
  id,
  name,
  label,
}: {
  id: string;
  name: string;
  label: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        name={name}
        required
        className={selectClassName}
        defaultValue=""
        aria-describedby={`${id}-help`}
        aria-required="true"
      >
        <option value="" disabled>
          Elige un número
        </option>
        {SCORES.map((score) => (
          <option key={score} value={score}>
            {score}
          </option>
        ))}
      </select>
      <p id={`${id}-help`} className="m-0 text-sm text-neutral-800">
        1 es muy mal. 10 es muy bien.
      </p>
    </div>
  );
}

function readScoreFromForm(form: FormData): NewScoreData {
  const hasAllergenChart = form.get("hasAllergenChart") === "yes";
  const comment = String(form.get("comment") ?? "").trim();

  return {
    hasAllergenChart,
    allergenChartQuality: hasAllergenChart
      ? Number(form.get("allergenChartQuality"))
      : undefined,
    hadAllergicReaction: form.get("hadAllergicReaction") === "yes",
    attentionScore: Number(form.get("attentionScore")),
    comment: comment || undefined,
  };
}

export function AddScoreForm({ restaurantId }: { restaurantId: number }) {
  const router = useRouter();
  const [hasAllergenChart, setHasAllergenChart] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (saving) return;
    setSaving(true);
    setError(null);

    try {
      await addScore(
        restaurantId,
        readScoreFromForm(new FormData(event.currentTarget)),
      );
      router.push(`/restaurants/${restaurantId}`);
    } catch (e) {
      setError((e as Error).message);
      setSaving(false);
    }
  };

  return (
    <section aria-labelledby="add-score-heading">
      <div className="bg-foodiesaurus px-4 py-10 text-white">
        <div className="mx-auto max-w-xl">
          <h2
            id="add-score-heading"
            className="mt-0 mb-3 text-2xl font-bold text-white"
          >
            Tu visita
          </h2>
          <p className="m-0">
            Cuenta cómo fue tu visita. Así ayudas a otras personas con
            alergias.
          </p>
        </div>
      </div>

      <div className="bg-white px-4 py-10">
        <form
          className="mx-auto max-w-xl space-y-6 text-neutral-800"
          onSubmit={handleSubmit}
        >
          <YesNoQuestion
            name="hasAllergenChart"
            legend="¿Tenían carta de alérgenos?"
            onChange={setHasAllergenChart}
          />

          {hasAllergenChart && (
            <ScoreSelect
              id="score-allergen-chart-quality"
              name="allergenChartQuality"
              label="¿Cómo era la carta de alérgenos?"
            />
          )}

          <YesNoQuestion
            name="hadAllergicReaction"
            legend="¿Tuviste una reacción alérgica?"
          />

          <ScoreSelect
            id="score-attention"
            name="attentionScore"
            label="¿Cómo te atendió el personal?"
          />

          <div className="flex flex-col gap-2">
            <label htmlFor="score-comment">Comentario</label>
            <textarea
              id="score-comment"
              name="comment"
              rows={4}
              maxLength={300}
              className="rounded border border-gray-dark bg-white p-3 text-neutral-900"
              aria-describedby="score-comment-help"
            />
            <p id="score-comment-help" className="m-0 text-sm text-neutral-800">
              Puedes contar algo más. No es obligatorio. Máximo 300 letras.
            </p>
          </div>

          {error && (
            <p
              className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-red-800"
              role="alert"
            >
              {error}
            </p>
          )}

          {saving && (
            <p className="m-0" role="status" aria-live="polite">
              Guardando la puntuación.
            </p>
          )}

          <Button type="submit" className="min-h-12">
            Guardar puntuación
          </Button>
        </form>
      </div>
    </section>
  );
}
