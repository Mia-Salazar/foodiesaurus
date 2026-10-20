import { RestaurantAverages } from "../entities/restaurant-detail";

export interface ScoreAveragesInput {
  attentionScore: number;
  fidelityScore: number;
  allergenChart: number;
  allergicReaction?: number;
}

function reactionContribution(reactionPercent: number): number {
  if (reactionPercent === 0) return 50;
  if (reactionPercent === 100) return 0;
  return 50 - reactionPercent / 2;
}

export function computeRestaurantAverages(
  scores: ScoreAveragesInput[],
): RestaurantAverages | null {
  if (scores.length === 0) return null;

  const totalReviews = scores.length;
  const attention =
    scores.reduce((sum, score) => sum + score.attentionScore, 0) / totalReviews;
  const fidelity =
    scores.reduce((sum, score) => sum + score.fidelityScore, 0) / totalReviews;
  const chartCount = scores.filter((score) => score.allergenChart === 1).length;
  const chartPercent = (chartCount * 100) / totalReviews;
  const reactionCount = scores.filter((score) => score.allergicReaction === 1).length;
  const reactionPercent = (reactionCount * 100) / totalReviews;
  const general = Math.floor(
    (attention * 10 * 0.2 +
      chartPercent * 0.15 +
      fidelity * 10 * 0.15 +
      reactionContribution(reactionPercent)) /
      10,
  );

  return {
    general,
    attention: Math.floor(attention),
    allergenChartPercent: Math.round(chartPercent),
    fidelity: Math.floor(fidelity),
    allergicReactionPercent: Math.floor(reactionPercent),
    totalReviews,
  };
}
