import { describe, expect, it } from "vitest";
import { Restaurant } from "@/server/domain/restaurant/entities/restaurant.entity";
import { SpainRestaurant } from "@/server/domain/restaurant/entities/spain-restaurant";
import { InMemoryRestaurantRepository } from "@/tests/fakes/in-memory-restaurant.repository";
import { InMemorySpainRestaurantDirectory } from "@/tests/fakes/in-memory-spain-restaurant.directory";
import { FindRestaurantForScoringUseCase } from "./find-restaurant-for-scoring.usecase";

function restaurant(id: number, name: string, province: string, address: string) {
  return new Restaurant(id, name, province, address);
}

function spainRestaurant(name: string, address: string) {
  return new SpainRestaurant(`${name}-id`, name, address, "Madrid", "28006");
}

function lookup(
  ours: Restaurant[] = [],
  spain: SpainRestaurant[] = [],
) {
  const directory = new InMemorySpainRestaurantDirectory(spain);
  return {
    directory,
    useCase: new FindRestaurantForScoringUseCase(
      new InMemoryRestaurantRepository(ours),
      directory,
    ),
  };
}

describe("Given I have not written a name", () => {
  describe("When I ask to look up a restaurant", () => {
    it("Then the lookup should be rejected", async () => {
      const { useCase } = lookup();

      await expect(useCase.execute("  ")).rejects.toThrow("Name is required");
    });
  });
});

describe("Given Friki Pizza is already in Foodiesaurus", () => {
  describe("When I search for Friki", () => {
    it("Then I should get the catalog restaurant and skip the directory", async () => {
      const { useCase, directory } = lookup(
        [restaurant(24, "Friki Pizza", "Madrid", "Calle de Alcántara, 71")],
        [spainRestaurant("Friki Pizza", "Calle Inventada 1")],
      );

      const result = await useCase.execute(" friki ");

      expect(result).toEqual({
        source: "ours",
        restaurants: [
          expect.objectContaining({
            id: 24,
            name: "Friki Pizza",
            address: "Calle de Alcántara, 71",
          }),
        ],
      });
      expect(directory.calls).toEqual([]);
    });
  });
});

describe("Given that name is not in Foodiesaurus", () => {
  describe("And the restaurant directory has matching restaurants", () => {
    describe("When I search for Canalla", () => {
      it("Then I should get the directory restaurants with name and address", async () => {
        const { useCase } = lookup(
          [restaurant(24, "Friki Pizza", "Madrid", "Calle de Alcántara, 71")],
          [
            spainRestaurant("Canalla Bistro", "Carrer de la Llotja, 2"),
            spainRestaurant("Canalla Bar", "Gran Vía 10"),
          ],
        );

        const result = await useCase.execute("Canalla");

        expect(result.source).toBe("spain");
        expect(result.restaurants.map((item) => item.name)).toEqual([
          "Canalla Bistro",
          "Canalla Bar",
        ]);
        expect(result.restaurants[0]).toMatchObject({
          name: "Canalla Bistro",
          address: "Carrer de la Llotja, 2",
        });
      });
    });
  });

  describe("And the restaurant directory has no matching restaurants", () => {
    describe("When I search for un restaurante inventado", () => {
      it("Then I should get an empty directory list", async () => {
        const { useCase } = lookup();

        const result = await useCase.execute("Restaurante Inventado");

        expect(result).toEqual({ source: "spain", restaurants: [] });
      });
    });
  });
});
