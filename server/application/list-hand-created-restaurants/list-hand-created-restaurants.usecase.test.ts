import { describe, expect, it } from "vitest";
import { InMemoryRestaurantRepository } from "@/tests/fakes/in-memory-restaurant.repository";
import { ListHandCreatedRestaurantsUseCase } from "./list-hand-created-restaurants.usecase";

describe("Given Mia created Canalla Bistro by hand and also scored a restaurant from Spain", () => {
  describe("When she opens her restaurants", () => {
    it("Then she should only see the one she created by hand", async () => {
      const repository = new InMemoryRestaurantRepository();
      await repository.create({
        ownerId: "mia",
        name: "Canalla Bistro",
        province: "Valencia",
        address: "Carrer de la Llotja, 2",
      });
      await repository.create({
        ownerId: "mia",
        name: "Bar España",
        province: "Madrid",
        address: "Calle Mayor, 1",
        apiId: "node:123",
      });
      await repository.create({
        ownerId: "other",
        name: "Casa Luna",
        province: "Sevilla",
        address: "Calle Betis, 3",
      });

      const restaurants = await new ListHandCreatedRestaurantsUseCase(
        repository,
      ).execute("mia");

      expect(restaurants.map((restaurant) => restaurant.name)).toEqual([
        "Canalla Bistro",
      ]);
    });
  });
});
