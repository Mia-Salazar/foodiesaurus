import { describe, expect, it } from "vitest";
import { addDirectoryRestaurantScoreSchema } from "./add-directory-restaurant-score.validator";

const restaurant = {
  name: "Canalla Bistro",
  province: "Valencia",
  address: "Carrer de la Llotja, 2",
};

describe("Given a directory restaurant score", () => {
  describe("When the chart quality is missing but they say there is a chart", () => {
    it("Then it should be rejected", () => {
      expect(
        addDirectoryRestaurantScoreSchema.safeParse({
          ...restaurant,
          hasAllergenChart: true,
          hadAllergicReaction: false,
          attentionScore: 9,
        }).success,
      ).toBe(false);
    });
  });

  describe("When the visit is answered and there is no chart", () => {
    it("Then it should be accepted", () => {
      expect(
        addDirectoryRestaurantScoreSchema.safeParse({
          ...restaurant,
          hasAllergenChart: false,
          hadAllergicReaction: false,
          attentionScore: 9,
          zip: "   ",
        }).success,
      ).toBe(true);
    });
  });
});
