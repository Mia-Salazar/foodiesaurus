import { beforeEach, describe, expect, it } from "vitest";
import { Restaurant } from "@/server/domain/restaurant/entities/restaurant.entity";
import { RestaurantWithScores } from "@/server/domain/restaurant/repositories/restaurant.repository";
import { InMemoryRestaurantRepository } from "@/tests/fakes/in-memory-restaurant.repository";
import { GetRestaurantByIdUseCase } from "./get-restaurant-by-id.usecase";
import { RestaurantDetail } from "@/server/domain/restaurant/entities/restaurant-detail";

function restaurantWithScores(): RestaurantWithScores {
  return {
    restaurant: new Restaurant(
      24,
      "Friki Pizza",
      "Madrid",
      "Calle de Alcántara, 71",
      "28006",
      "https://frikipizza.es/menu.html",
      "688646246",
      "Pizza",
      40.43,
      -3.67,
    ),
    scores: [
      {
        id: 15,
        comment: "  Muy buena atención y comida  ",
        createdAt: new Date("2023-08-04T00:00:00.000Z"),
        generalScore: 10,
        allergenChart: 1,
        fidelityScore: 9,
        attentionScore: 10,
        allergicReaction: 0,
        userName: "  Usuario legacy 1  ",
      },
      {
        id: 16,
        comment: "   ",
        createdAt: new Date("2023-09-01T00:00:00.000Z"),
        generalScore: 8,
        allergenChart: 0,
        fidelityScore: 5,
        attentionScore: 7,
        userName: "   ",
      },
    ],
  };
}

describe("Given no restaurant has id 999", () => {
  describe("When I ask for restaurant 999", () => {
    it("Then I should get nothing", async () => {
      const useCase = new GetRestaurantByIdUseCase(new InMemoryRestaurantRepository());

      await expect(useCase.execute(999)).resolves.toBeNull();
    });
  });
});

describe("Given Friki Pizza has two reviews", () => {
  describe("And only one of them has a comment", () => {
    describe("When I ask for restaurant 24", () => {
      let restaurant: RestaurantDetail | null;

      beforeEach(async () => {
        const useCase = new GetRestaurantByIdUseCase(
          new InMemoryRestaurantRepository([], new Map([[24, restaurantWithScores()]])),
        );
        restaurant = await useCase.execute(24);
      });

      it("Then I should see its averages from both reviews", () => {
        expect(restaurant).toMatchObject({
          id: 24,
          name: "Friki Pizza",
          province: "Madrid",
          averages: {
            general: 8,
            totalReviews: 2,
          },
        });
      });

      it("And I should only see the comment that has text", () => {
        expect(restaurant?.reviews).toHaveLength(1);
        expect(restaurant?.reviews[0]).toMatchObject({
          userName: "Usuario legacy 1",
          comment: "Muy buena atención y comida",
          allergenChart: true,
          allergicReaction: false,
        });
      });
    });
  });
});

describe("Given a review with a comment but no author", () => {
  describe("When I ask for that restaurant", () => {
    it("Then the comment should be signed as Foodie", async () => {
      const detail = restaurantWithScores();
      detail.scores[0].userName = undefined;
      const useCase = new GetRestaurantByIdUseCase(
        new InMemoryRestaurantRepository([], new Map([[24, detail]])),
      );

      const restaurant = await useCase.execute(24);

      expect(restaurant?.reviews[0].userName).toBe("Foodie");
    });
  });
});
