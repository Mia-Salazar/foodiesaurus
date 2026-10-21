import { describe, expect, it } from "vitest";
import { DirectoryRestaurant } from "@/server/domain/restaurant/entities/directory-restaurant";
import { Restaurant } from "@/server/domain/restaurant/entities/restaurant.entity";
import { InMemoryRestaurantDirectory } from "@/tests/fakes/in-memory-restaurant.directory";
import { InMemoryRestaurantRepository } from "@/tests/fakes/in-memory-restaurant.repository";
import { FindRestaurantForScoringUseCase } from "./find-restaurant-for-scoring.usecase";

function catalogRestaurant(id: number, name: string, province: string, address: string) {
  return new Restaurant(id, name, province, address);
}

function directoryRestaurant(name: string, address: string) {
  return new DirectoryRestaurant(`${name}-id`, name, address, "Madrid", "28006");
}

function lookup(
  catalog: Restaurant[] = [],
  directoryMatches: DirectoryRestaurant[] = [],
) {
  const restaurantDirectory = new InMemoryRestaurantDirectory(directoryMatches);
  return {
    restaurantDirectory,
    useCase: new FindRestaurantForScoringUseCase(
      new InMemoryRestaurantRepository(catalog),
      restaurantDirectory,
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
      const { useCase, restaurantDirectory } = lookup(
        [catalogRestaurant(24, "Friki Pizza", "Madrid", "Calle de Alcántara, 71")],
        [directoryRestaurant("Friki Pizza", "Calle Inventada 1")],
      );

      const result = await useCase.execute(" friki ");

      expect(result).toEqual({
        source: "catalog",
        restaurants: [
          expect.objectContaining({
            id: 24,
            name: "Friki Pizza",
            address: "Calle de Alcántara, 71",
          }),
        ],
      });
      expect(restaurantDirectory.calls).toEqual([]);
    });
  });
});

describe("Given that name is not in Foodiesaurus", () => {
  describe("And the restaurant directory has matching restaurants", () => {
    describe("When I search for Canalla", () => {
      it("Then I should get the directory restaurants with name and address", async () => {
        const { useCase } = lookup(
          [catalogRestaurant(24, "Friki Pizza", "Madrid", "Calle de Alcántara, 71")],
          [
            directoryRestaurant("Canalla Bistro", "Carrer de la Llotja, 2"),
            directoryRestaurant("Canalla Bar", "Gran Vía 10"),
          ],
        );

        const result = await useCase.execute("Canalla");

        expect(result.source).toBe("directory");
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

        expect(result).toEqual({ source: "directory", restaurants: [] });
      });
    });
  });
});
