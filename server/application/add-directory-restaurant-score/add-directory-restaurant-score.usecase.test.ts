import { describe, expect, it } from "vitest";
import { InMemoryRestaurantRepository } from "@/tests/fakes/in-memory-restaurant.repository";
import { AddDirectoryRestaurantScoreUseCase } from "./add-directory-restaurant-score.usecase";

describe("Given Canalla Bistro is only in the restaurant directory", () => {
  describe("When Mia scores it", () => {
    it("Then the restaurant and the score should be saved together", async () => {
      const repository = new InMemoryRestaurantRepository();
      const useCase = new AddDirectoryRestaurantScoreUseCase(repository);

      const saved = await useCase.execute({
        userId: "mia",
        name: "Canalla Bistro",
        province: "Valencia",
        address: "Carrer de la Llotja, 2",
        zip: "46003",
        apiId: "node:123",
        latitude: 39.47,
        longitude: -0.37,
        hasAllergenChart: true,
        allergenChartQuality: 8,
        hadAllergicReaction: false,
        attentionScore: 9,
        comment: "Buena carta",
      });

      expect(saved).toEqual({ restaurantId: 1 });
      expect(repository.created).toEqual([
        {
          ownerId: "mia",
          name: "Canalla Bistro",
          province: "Valencia",
          address: "Carrer de la Llotja, 2",
          zip: "46003",
          apiId: "node:123",
          latitude: 39.47,
          longitude: -0.37,
        },
      ]);
      expect(repository.addedScores).toEqual([
        {
          restaurantId: 1,
          userId: "mia",
          generalScore: 9,
          allergenChart: 1,
          fidelityScore: 8,
          attentionScore: 9,
          allergicReaction: 0,
          comment: "Buena carta",
        },
      ]);
    });
  });
});
