import { describe, expect, it } from "vitest";
import { InMemoryRestaurantRepository } from "@/tests/fakes/in-memory-restaurant.repository";
import { ListUserScoresUseCase } from "./list-user-scores.usecase";

describe("Given Mia scored Canalla Bistro and a restaurant that already existed", () => {
  describe("When she opens her opinions", () => {
    it("Then she should see only her opinions, newest first", async () => {
      const repository = new InMemoryRestaurantRepository();
      const canalla = await repository.create({
        ownerId: "mia",
        name: "Canalla Bistro",
        province: "Valencia",
        address: "Carrer de la Llotja, 2",
      });
      const bar = await repository.create({
        ownerId: "other",
        name: "Bar España",
        province: "Madrid",
        address: "Calle Mayor, 1",
        apiId: "node:123",
      });
      await repository.addScore({
        restaurantId: canalla.id,
        userId: "mia",
        generalScore: 9,
        allergenChart: 1,
        fidelityScore: 8,
        attentionScore: 9,
        allergicReaction: 0,
        comment: "Buena atención",
      });
      await repository.addScore({
        restaurantId: bar.id,
        userId: "mia",
        generalScore: 7,
        allergenChart: 0,
        fidelityScore: 0,
        attentionScore: 8,
        allergicReaction: 0,
      });
      await repository.addScore({
        restaurantId: canalla.id,
        userId: "other",
        generalScore: 4,
        allergenChart: 1,
        fidelityScore: 5,
        attentionScore: 4,
        allergicReaction: 1,
      });

      const scores = await new ListUserScoresUseCase(repository).execute("mia");

      expect(scores.map((score) => score.restaurantName)).toEqual([
        "Bar España",
        "Canalla Bistro",
      ]);
      expect(scores[1].comment).toBe("Buena atención");
      expect(scores[1].allergenChart).toBe(1);
    });
  });
});
