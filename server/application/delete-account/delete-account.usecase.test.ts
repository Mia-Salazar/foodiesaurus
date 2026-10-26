import { describe, expect, it } from "vitest";
import { GetRestaurantByIdUseCase } from "@/server/application/get-restaurant-by-id/get-restaurant-by-id.usecase";
import { RestaurantWithScores } from "@/server/domain/restaurant/repositories/restaurant.repository";
import { InMemoryAccountRepository } from "@/tests/fakes/in-memory-account.repository";
import { InMemoryRestaurantRepository } from "@/tests/fakes/in-memory-restaurant.repository";
import { DeleteAccountUseCase } from "./delete-account.usecase";

describe("Given Mia owns Canalla and scored Canalla and Bar España", () => {
  describe("And another person also scored Canalla", () => {
    describe("When Mia deletes her account", () => {
      it("Then her opinions go away, the restaurants stay, and a restaurant with no scores left has no average", async () => {
        const details = new Map<number, RestaurantWithScores>();
        const restaurants = new InMemoryRestaurantRepository([], details);
        const canalla = await restaurants.create({
          ownerId: "mia",
          name: "Canalla Bistro",
          province: "Madrid",
          address: "Calle Mayor, 2",
        });
        const bar = await restaurants.create({
          ownerId: "other",
          name: "Bar España",
          province: "Madrid",
          address: "Calle Mayor, 1",
        });
        const miaOnCanalla = await restaurants.addScore({
          restaurantId: canalla.id,
          userId: "mia",
          generalScore: 9,
          allergenChart: 1,
          fidelityScore: 8,
          attentionScore: 9,
          allergicReaction: 0,
          comment: "Buena atención",
        });
        const miaOnBar = await restaurants.addScore({
          restaurantId: bar.id,
          userId: "mia",
          generalScore: 7,
          allergenChart: 0,
          fidelityScore: 0,
          attentionScore: 8,
          allergicReaction: 0,
          comment: "Sin carta",
        });
        const otherOnCanalla = await restaurants.addScore({
          restaurantId: canalla.id,
          userId: "other",
          generalScore: 4,
          allergenChart: 1,
          fidelityScore: 5,
          attentionScore: 4,
          allergicReaction: 1,
          comment: "Regular",
        });
        const createdAt = new Date("2026-10-01T12:00:00.000Z");
        details.set(canalla.id, {
          restaurant: canalla,
          scores: [
            {
              id: miaOnCanalla.id,
              createdAt,
              generalScore: 9,
              allergenChart: 1,
              fidelityScore: 8,
              attentionScore: 9,
              allergicReaction: 0,
              comment: "Buena atención",
              userName: "Mia",
            },
            {
              id: otherOnCanalla.id,
              createdAt,
              generalScore: 4,
              allergenChart: 1,
              fidelityScore: 5,
              attentionScore: 4,
              allergicReaction: 1,
              comment: "Regular",
              userName: "Ana",
            },
          ],
        });
        details.set(bar.id, {
          restaurant: bar,
          scores: [
            {
              id: miaOnBar.id,
              createdAt,
              generalScore: 7,
              allergenChart: 0,
              fidelityScore: 0,
              attentionScore: 8,
              allergicReaction: 0,
              comment: "Sin carta",
              userName: "Mia",
            },
          ],
        });
        const accounts = new InMemoryAccountRepository(restaurants);

        await new DeleteAccountUseCase(accounts).execute("mia");

        expect(accounts.deletedUserIds).toEqual(["mia"]);
        expect(await restaurants.findScoresByUser("mia")).toEqual([]);
        expect(await restaurants.findCreatedByHand("mia")).toEqual([]);
        expect((await restaurants.findScoresByUser("other")).map((score) => score.restaurantName)).toEqual([
          "Canalla Bistro",
        ]);
        expect((await restaurants.findCreatedByHand("other")).map((item) => item.name)).toEqual([
          "Bar España",
        ]);

        const listed = await restaurants.search({ province: "Madrid" });
        expect(listed.map((item) => item.name)).toEqual(["Bar España", "Canalla Bistro"]);
        expect(listed.find((item) => item.name === "Bar España")?.score).toBeUndefined();
        expect(listed.find((item) => item.name === "Canalla Bistro")?.score).toBe(4);

        const barDetail = await new GetRestaurantByIdUseCase(restaurants).execute(bar.id);
        const canallaDetail = await new GetRestaurantByIdUseCase(restaurants).execute(canalla.id);
        expect(barDetail?.averages).toBeNull();
        expect(barDetail?.reviews).toEqual([]);
        expect(canallaDetail?.averages).not.toBeNull();
        expect(canallaDetail?.reviews.map((review) => review.userName)).toEqual(["Ana"]);
      });
    });
  });
});
