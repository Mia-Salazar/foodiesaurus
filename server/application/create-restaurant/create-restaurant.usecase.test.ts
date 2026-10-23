import { describe, expect, it } from "vitest";
import { Restaurant } from "@/server/domain/restaurant/entities/restaurant.entity";
import { InMemoryRestaurantRepository } from "@/tests/fakes/in-memory-restaurant.repository";
import { CreateRestaurantUseCase } from "./create-restaurant.usecase";

describe("Given I am logged in as Mia", () => {
  describe("And Friki Pizza is already in Foodiesaurus", () => {
    describe("When I create Canalla Bistro with all its data", () => {
      it("Then it should be saved with me as the owner and a new id", async () => {
        const repository = new InMemoryRestaurantRepository([
          new Restaurant(24, "Friki Pizza", "Madrid", "Calle de Alcántara, 71"),
        ]);
        const useCase = new CreateRestaurantUseCase(repository);

        const restaurant = await useCase.execute({
          ownerId: "mia",
          name: "Canalla Bistro",
          province: "Valencia",
          address: "Carrer de la Llotja, 2",
          zip: "46003",
          url: "https://www.canallabistro.com",
          phone: "963551470",
          foodType: "Tapas",
        });

        expect(restaurant).toMatchObject({
          id: 25,
          name: "Canalla Bistro",
          province: "Valencia",
          address: "Carrer de la Llotja, 2",
          zip: "46003",
          url: "https://www.canallabistro.com",
          phone: "963551470",
          foodType: "Tapas",
        });
        expect(repository.created).toEqual([
          expect.objectContaining({ ownerId: "mia" }),
        ]);
      });

      it("And I should find it when I search by its name", async () => {
        const repository = new InMemoryRestaurantRepository();
        const useCase = new CreateRestaurantUseCase(repository);

        await useCase.execute({
          ownerId: "mia",
          name: "Canalla Bistro",
          province: "Valencia",
          address: "Carrer de la Llotja, 2",
        });

        const matches = await repository.searchByName("canalla");
        expect(matches.map((item) => item.name)).toEqual(["Canalla Bistro"]);
      });
    });
  });
});
