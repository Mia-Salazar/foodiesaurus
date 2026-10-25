"use client";

import { FormEvent, ReactNode, useState } from "react";
import { NewScoreData, ScoreDraft } from "@/client/features/add-score/api/addScore";
import Button from "@/client/shared/ui/atoms/Button";
import { ScoreSelect } from "./ScoreSelect";
import { YesNoQuestion } from "./YesNoQuestion";

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

export function ScoreForm({
  onSave,
  initial,
  editing = false,
  extraComplete = true,
  children,
}: {
  onSave: (score: NewScoreData) => Promise<void>;
  initial?: ScoreDraft;
  editing?: boolean;
  extraComplete?: boolean;
  children?: ReactNode;
}) {
  const [hasAllergenChart, setHasAllergenChart] = useState<boolean | null>(
    initial?.hasAllergenChart ?? null,
  );
  const [allergenChartQuality, setAllergenChartQuality] = useState<number | null>(
    initial?.allergenChartQuality ?? null,
  );
  const [hadAllergicReaction, setHadAllergicReaction] = useState<boolean | null>(
    initial?.hadAllergicReaction ?? null,
  );
  const [attentionScore, setAttentionScore] = useState<number | null>(
    initial?.attentionScore ?? null,
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const answersComplete =
    extraComplete &&
    hasAllergenChart !== null &&
    hadAllergicReaction !== null &&
    attentionScore !== null &&
    (!hasAllergenChart || allergenChartQuality !== null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (saving || !answersComplete) return;
    setSaving(true);
    setError(null);

    try {
      await onSave(readScoreFromForm(new FormData(event.currentTarget)));
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
            {editing
              ? "Cambia cómo fue tu visita."
              : "Cuenta cómo fue tu visita. Así ayudas a otras personas con alergias."}
          </p>
        </div>
      </div>

      <div className="bg-white px-4 py-10">
        <form
          className="mx-auto max-w-xl space-y-6 text-neutral-800"
          onSubmit={handleSubmit}
        >
          {children}

          <YesNoQuestion
            name="hasAllergenChart"
            legend="¿Tenían carta de alérgenos?"
            answer={hasAllergenChart}
            onChange={(yes) => {
              setHasAllergenChart(yes);
              setAllergenChartQuality(null);
            }}
          />

          {hasAllergenChart && (
            <ScoreSelect
              id="score-allergen-chart-quality"
              name="allergenChartQuality"
              label="¿Cómo era la carta de alérgenos?"
              value={allergenChartQuality}
              onChange={setAllergenChartQuality}
            />
          )}

          <YesNoQuestion
            name="hadAllergicReaction"
            legend="¿Tuviste una reacción alérgica?"
            answer={hadAllergicReaction}
            onChange={setHadAllergicReaction}
          />

          <ScoreSelect
            id="score-attention"
            name="attentionScore"
            label="¿Cómo te atendió el personal?"
            value={attentionScore}
            onChange={setAttentionScore}
          />

          <div className="flex flex-col gap-2">
            <label htmlFor="score-comment">Comentario</label>
            <textarea
              id="score-comment"
              name="comment"
              rows={4}
              maxLength={300}
              className="w-full rounded border border-gray-dark bg-white p-3 text-neutral-900"
              aria-describedby="score-comment-help"
              defaultValue={initial?.comment ?? ""}
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
              {editing ? "Guardando los cambios." : "Guardando la puntuación."}
            </p>
          )}

          {!answersComplete && (
            <p id="score-submit-help" className="m-0 text-sm text-neutral-800">
              Responde las preguntas para guardar. El comentario es opcional.
            </p>
          )}

          <Button
            type="submit"
            className="min-h-12"
            disabled={!answersComplete || saving}
          >
            {editing ? "Guardar cambios" : "Guardar puntuación"}
          </Button>
        </form>
      </div>
    </section>
  );
}
