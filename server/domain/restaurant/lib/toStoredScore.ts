import { computeRestaurantAverages } from "./computeRestaurantAverages";

export interface ScoreAnswers {
  hasAllergenChart: boolean;
  allergenChartQuality?: number;
  hadAllergicReaction: boolean;
  attentionScore: number;
  comment?: string;
}

export function toStoredScore(answers: ScoreAnswers) {
  const ratings = {
    allergenChart: answers.hasAllergenChart ? 1 : 0,
    fidelityScore: answers.hasAllergenChart ? (answers.allergenChartQuality ?? 0) : 0,
    attentionScore: answers.attentionScore,
    allergicReaction: answers.hadAllergicReaction ? 1 : 0,
  };

  return {
    ...ratings,
    generalScore: computeRestaurantAverages([ratings])!.general,
    comment: answers.comment,
  };
}
