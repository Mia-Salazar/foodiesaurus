import { describe, expect, it } from "vitest";
import { Restaurant } from "@/server/domain/restaurant/entities/restaurant.entity";
import { InMemoryRestaurantRepository } from "@/tests/fakes/in-memory-restaurant.repository";
import { AddRestaurantScoreUseCase } from "./add-restaurant-score.usecase";

function withFrikiPizza() {
  const repository = new InMemoryRestaurantRepository(
    [],
    new Map([
      [
        24,
        {
          restaurant: new Restaurant(24, "Friki Pizza", "Madrid", "Calle de Alcántara, 71"),
          scores: [],
        },
      ],
    ]),
  );
  return { repository, useCase: new AddRestaurantScoreUseCase(repository) };
}

describe("Given Friki Pizza is in Foodiesaurus", () => {
  describe("When Mia scores it with an allergen chart of quality 9, attention 10 and no reaction", () => {
    it("Then the score should be saved with a general score of 9", async () => {
      const { repository, useCase } = withFrikiPizza();

      const saved = await useCase.execute({
        restaurantId: 24,
        userId: "mia",
        hasAllergenChart: true,
        allergenChartQuality: 9,
        hadAllergicReaction: false,
        attentionScore: 10,
        comment: "Muy buena atención",
      });

      expect(saved).toEqual({ id: 1 });
      expect(repository.addedScores).toEqual([
        {
          restaurantId: 24,
          userId: "mia",
          generalScore: 9,
          allergenChart: 1,
          fidelityScore: 9,
          attentionScore: 10,
          allergicReaction: 0,
          comment: "Muy buena atención",
        },
      ]);
    });
  });

  describe("When Mia scores it without an allergen chart", () => {
    it("Then the chart quality should be saved as 0", async () => {
      const { repository, useCase } = withFrikiPizza();

      await useCase.execute({
        restaurantId: 24,
        userId: "mia",
        hasAllergenChart: false,
        allergenChartQuality: 7,
        hadAllergicReaction: false,
        attentionScore: 8,
      });

      expect(repository.addedScores[0]).toMatchObject({
        allergenChart: 0,
        fidelityScore: 0,
      });
    });
  });

  describe("When Mia had an allergic reaction there", () => {
    it("Then the reaction should be saved and the general score lowered", async () => {
      const { repository, useCase } = withFrikiPizza();

      await useCase.execute({
        restaurantId: 24,
        userId: "mia",
        hasAllergenChart: true,
        allergenChartQuality: 10,
        hadAllergicReaction: true,
        attentionScore: 10,
      });

      expect(repository.addedScores[0]).toMatchObject({
        allergicReaction: 1,
        generalScore: 5,
      });
    });
  });
});

describe("Given restaurant 999 is not in Foodiesaurus", () => {
  describe("When Mia tries to score it", () => {
    it("Then nothing should be saved", async () => {
      const { repository, useCase } = withFrikiPizza();

      const saved = await useCase.execute({
        restaurantId: 999,
        userId: "mia",
        hasAllergenChart: false,
        hadAllergicReaction: false,
        attentionScore: 5,
      });

      expect(saved).toBeNull();
      expect(repository.addedScores).toEqual([]);
    });
  });
});
