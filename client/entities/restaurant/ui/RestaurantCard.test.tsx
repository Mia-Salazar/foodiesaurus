import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Restaurant } from "../model/types";
import { RestaurantCard } from "./RestaurantCard";

function restaurant(overrides: Partial<Restaurant> = {}): Restaurant {
  return {
    id: 1,
    name: "Canalla Bistro",
    province: "Valencia",
    address: "Carrer de la Llotja, 2",
    ...overrides,
  };
}

describe("Given a restaurant card", () => {
  describe("When the restaurant has a score", () => {
    it("Then I should see that score", () => {
      render(<RestaurantCard restaurant={restaurant({ score: 8 })} />);

      expect(screen.getByText("8")).toBeInTheDocument();
      expect(screen.getByText("/10")).toBeInTheDocument();
      expect(screen.queryByText("Sin puntuación")).not.toBeInTheDocument();
    });
  });

  describe("When the restaurant has no score", () => {
    it("Then I should see a dash", () => {
      render(<RestaurantCard restaurant={restaurant()} />);

      expect(screen.getByRole("article")).toHaveTextContent("-");
      expect(screen.getByText("Sin puntuación")).toBeInTheDocument();
      expect(screen.queryByText("/10")).not.toBeInTheDocument();
    });
  });
});
