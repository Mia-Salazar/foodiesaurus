import { z } from "zod";

const scoreFromOneToTen = z.number().int().min(1).max(10);

export const addRestaurantScoreSchema = z
  .object({
    hasAllergenChart: z.boolean(),
    allergenChartQuality: scoreFromOneToTen.optional(),
    hadAllergicReaction: z.boolean(),
    attentionScore: scoreFromOneToTen,
    comment: z
      .string()
      .trim()
      .max(300)
      .optional()
      .transform((value) => value || undefined),
  })
  .refine((score) => !score.hasAllergenChart || score.allergenChartQuality != null, {
    message: "Allergen chart quality is required when there is a chart",
    path: ["allergenChartQuality"],
  });
