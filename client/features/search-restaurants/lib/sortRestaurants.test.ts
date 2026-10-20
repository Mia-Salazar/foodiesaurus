import { describe, expect, it } from "vitest";
import { Restaurant } from "@/client/entities/restaurant/model/types";
import { isRestaurantSort, sortRestaurants } from "./sortRestaurants";

function restaurant(overrides: Partial<Restaurant> & Pick<Restaurant, "id" | "name">): Restaurant {
  return {
    province: "Madrid",
    address: "Calle Falsa 1",
    ...overrides,
  };
}

const restaurants = [
  restaurant({ id: 2, name: "Beta", score: 4 }),
  restaurant({ id: 1, name: "Alfa", score: 9 }),
  restaurant({ id: 3, name: "Zeta" }),
  restaurant({ id: 4, name: "Gamma", score: 9 }),
];

describe("Given restaurants named Beta, Alfa, Zeta and Gamma", () => {
  describe("When I sort them by name", () => {
    it("Then they should appear in alphabetical order", () => {
      expect(sortRestaurants(restaurants, "name").map((item) => item.name)).toEqual([
        "Alfa",
        "Beta",
        "Gamma",
        "Zeta",
      ]);
    });
  });
});

describe("Given Alfa and Gamma score 9", () => {
  describe("And Beta scores 4", () => {
    describe("And Zeta has no score", () => {
      describe("When I sort from highest score to lowest", () => {
        it("Then the highest scores should come first and missing scores last", () => {
          expect(sortRestaurants(restaurants, "score-desc").map((item) => item.name)).toEqual([
            "Alfa",
            "Gamma",
            "Beta",
            "Zeta",
          ]);
        });
      });

      describe("When I sort from lowest score to highest", () => {
        it("Then the lowest scores should come first and missing scores last", () => {
          expect(sortRestaurants(restaurants, "score-asc").map((item) => item.name)).toEqual([
            "Beta",
            "Alfa",
            "Gamma",
            "Zeta",
          ]);
        });
      });
    });
  });
});

describe("Given an unsorted list of restaurants", () => {
  describe("When I sort by score", () => {
    it("Then the original list should stay in the same order", () => {
      const original = [...restaurants];
      sortRestaurants(restaurants, "score-desc");
      expect(restaurants).toEqual(original);
    });
  });
});

describe("Given a sort value", () => {
  describe("When I check if it is a restaurant sort", () => {
    it("Then I should accept name and score-asc", () => {
      expect(isRestaurantSort("name")).toBe(true);
      expect(isRestaurantSort("score-asc")).toBe(true);
    });

    it("And I should reject unknown values", () => {
      expect(isRestaurantSort("popular")).toBe(false);
      expect(isRestaurantSort(undefined)).toBe(false);
    });
  });
});
