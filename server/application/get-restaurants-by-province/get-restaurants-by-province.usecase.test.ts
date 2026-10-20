import { describe, expect, it } from "vitest";
import { Restaurant } from "@/server/domain/restaurant/entities/restaurant.entity";
import { InMemoryRestaurantRepository } from "@/tests/fakes/in-memory-restaurant.repository";
import { SearchRestaurantsUseCase } from "./get-restaurants-by-province.usecase";

function restaurant(id: number, name: string, province: string) {
  return new Restaurant(id, name, province, "Calle Falsa 1");
}

const searchRestaurants = new SearchRestaurantsUseCase(
  new InMemoryRestaurantRepository([
    restaurant(1, "Friki Pizza", "Madrid"),
    restaurant(2, "Alfa", "Madrid"),
    restaurant(3, "Canalla", "Barcelona"),
  ]),
);

describe("Given I have not chosen a province", () => {
  describe("When I ask to search", () => {
    it("Then the search should be rejected", async () => {
      await expect(searchRestaurants.execute({ province: "  " })).rejects.toThrow(
        "Province parameter is required",
      );
    });
  });
});

describe("Given Friki Pizza and Alfa are in Madrid", () => {
  describe("And Canalla is in Barcelona", () => {
    describe("When I ask to search in Madrid", () => {
      it("Then I should only get the Madrid restaurants", async () => {
        const result = await searchRestaurants.execute({ province: "madrid" });

        expect(result.map((item) => item.name)).toEqual(["Alfa", "Friki Pizza"]);
      });
    });

    describe("When I ask to search for friki in Madrid", () => {
      it("Then I should only get Friki Pizza", async () => {
        const result = await searchRestaurants.execute({
          province: " Madrid ",
          term: " friki ",
        });

        expect(result).toHaveLength(1);
        expect(result[0].name).toBe("Friki Pizza");
      });
    });
  });
});
