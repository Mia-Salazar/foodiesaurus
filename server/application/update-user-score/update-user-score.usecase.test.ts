import { describe, expect, it } from "vitest";
import { InMemoryRestaurantRepository } from "@/tests/fakes/in-memory-restaurant.repository";
import { UpdateUserScoreUseCase } from "./update-user-score.usecase";

const answers = {
  hasAllergenChart: false,
  hadAllergicReaction: true,
  attentionScore: 4,
};

describe("Given Mia scored Canalla Bistro", () => {
  describe("When she changes that score", () => {
    it("Then the score should be updated and the chart quality cleared", async () => {
      const repository = new InMemoryRestaurantRepository();
      const restaurant = await repository.create({
        ownerId: "mia",
        name: "Canalla Bistro",
        province: "Valencia",
        address: "Carrer de la Llotja, 2",
      });
      const created = await repository.addScore({
        restaurantId: restaurant.id,
        userId: "mia",
        generalScore: 9,
        allergenChart: 1,
        fidelityScore: 8,
        attentionScore: 9,
        allergicReaction: 0,
        comment: "Buena atención",
      });

      const saved = await new UpdateUserScoreUseCase(repository).execute(
        created.id,
        "mia",
        answers,
      );

      expect(saved?.attentionScore).toBe(4);
      expect(saved?.allergenChart).toBe(0);
      expect(saved?.fidelityScore).toBe(0);
      expect(saved?.allergicReaction).toBe(1);
      expect(saved?.comment).toBeUndefined();
      expect(saved?.restaurantName).toBe("Canalla Bistro");
    });
  });

  describe("When someone else tries to change it", () => {
    it("Then nothing should change", async () => {
      const repository = new InMemoryRestaurantRepository();
      const restaurant = await repository.create({
        ownerId: "mia",
        name: "Canalla Bistro",
        province: "Valencia",
        address: "Carrer de la Llotja, 2",
      });
      const created = await repository.addScore({
        restaurantId: restaurant.id,
        userId: "mia",
        generalScore: 9,
        allergenChart: 1,
        fidelityScore: 8,
        attentionScore: 9,
        allergicReaction: 0,
      });

      const saved = await new UpdateUserScoreUseCase(repository).execute(
        created.id,
        "other",
        answers,
      );

      expect(saved).toBeNull();
      expect((await repository.findScoresByUser("mia"))[0].attentionScore).toBe(9);
    });
  });
});
