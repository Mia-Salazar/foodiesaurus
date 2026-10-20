import { describe, expect, it } from "vitest";
import { computeRestaurantAverages } from "./computeRestaurantAverages";

describe("Given a restaurant with no reviews", () => {
  describe("When I compute its averages", () => {
    it("Then it should have no averages", () => {
      expect(computeRestaurantAverages([])).toBeNull();
    });
  });
});

describe("Given a review with attention 10, fidelity 9, an allergen chart and no allergic reaction", () => {
  describe("When I compute its averages", () => {
    it("Then the general score should be 9", () => {
      expect(
        computeRestaurantAverages([
          {
            attentionScore: 10,
            fidelityScore: 9,
            allergenChart: 1,
            allergicReaction: 0,
          },
        ]),
      ).toEqual({
        general: 9,
        attention: 10,
        allergenChartPercent: 100,
        fidelity: 9,
        allergicReactionPercent: 0,
        totalReviews: 1,
      });
    });
  });
});

describe("Given a review with perfect attention and fidelity", () => {
  describe("And that visit had an allergic reaction", () => {
    describe("When I compute its averages", () => {
      it("Then the allergic reaction rate should be 100%", () => {
        const averages = computeRestaurantAverages([
          {
            attentionScore: 10,
            fidelityScore: 10,
            allergenChart: 1,
            allergicReaction: 1,
          },
        ]);

        expect(averages?.allergicReactionPercent).toBe(100);
      });

      it("And the general score should be penalized to 5", () => {
        const averages = computeRestaurantAverages([
          {
            attentionScore: 10,
            fidelityScore: 10,
            allergenChart: 1,
            allergicReaction: 1,
          },
        ]);

        expect(averages?.general).toBe(5);
      });
    });
  });
});

describe("Given one review with attention 8, fidelity 6 and an allergen chart", () => {
  describe("And another review with attention 4, fidelity 2 and no allergen chart", () => {
    describe("When I compute its averages", () => {
      it("Then attention should be 6, fidelity 4 and the allergen chart 50%", () => {
        expect(
          computeRestaurantAverages([
            {
              attentionScore: 8,
              fidelityScore: 6,
              allergenChart: 1,
              allergicReaction: 0,
            },
            {
              attentionScore: 4,
              fidelityScore: 2,
              allergenChart: 0,
              allergicReaction: 0,
            },
          ]),
        ).toMatchObject({
          attention: 6,
          fidelity: 4,
          allergenChartPercent: 50,
          allergicReactionPercent: 0,
          totalReviews: 2,
        });
      });
    });
  });
});
