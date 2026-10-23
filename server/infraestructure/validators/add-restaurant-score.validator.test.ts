import { describe, expect, it } from "vitest";
import { addRestaurantScoreSchema } from "./add-restaurant-score.validator";

describe("Given a new score", () => {
  describe("When it has a chart, its quality, a reaction answer and attention", () => {
    it("Then it should be accepted without an empty comment", () => {
      expect(
        addRestaurantScoreSchema.parse({
          hasAllergenChart: true,
          allergenChartQuality: 8,
          hadAllergicReaction: false,
          attentionScore: 9,
          comment: "   ",
        }),
      ).toEqual({
        hasAllergenChart: true,
        allergenChartQuality: 8,
        hadAllergicReaction: false,
        attentionScore: 9,
      });
    });
  });

  describe("When it says there is a chart but has no quality", () => {
    it("Then it should be rejected", () => {
      const parsed = addRestaurantScoreSchema.safeParse({
        hasAllergenChart: true,
        hadAllergicReaction: false,
        attentionScore: 9,
      });

      expect(parsed.success).toBe(false);
    });
  });

  describe("When a score is outside 1 to 10", () => {
    it("Then it should be rejected", () => {
      expect(
        addRestaurantScoreSchema.safeParse({
          hasAllergenChart: false,
          hadAllergicReaction: false,
          attentionScore: 11,
        }).success,
      ).toBe(false);
      expect(
        addRestaurantScoreSchema.safeParse({
          hasAllergenChart: true,
          allergenChartQuality: 0,
          hadAllergicReaction: false,
          attentionScore: 5,
        }).success,
      ).toBe(false);
    });
  });

  describe("When the comment is longer than 300 characters", () => {
    it("Then it should be rejected", () => {
      expect(
        addRestaurantScoreSchema.safeParse({
          hasAllergenChart: false,
          hadAllergicReaction: false,
          attentionScore: 5,
          comment: "a".repeat(301),
        }).success,
      ).toBe(false);
    });
  });
});
