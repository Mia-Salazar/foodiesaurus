import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Restaurant } from "@/client/entities/restaurant/model/types";
import { MyRestaurantsPage } from "./MyRestaurantsPage";

const canalla: Restaurant = {
  id: 31,
  name: "Canalla Bistro",
  province: "Valencia",
  address: "Carrer de la Llotja, 2",
  zip: "46003",
};

describe("Given I open my restaurants", () => {
  describe("When I have not created any restaurant by hand", () => {
    it("Then I should be told that this list is only for restaurants created by hand", () => {
      render(<MyRestaurantsPage restaurants={[]} />);

      expect(
        screen.getByRole("heading", { level: 1, name: "Mis restaurantes" }),
      ).toBeInTheDocument();
      expect(
        screen.getByText("Solo ves los restaurantes que has creado a mano."),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          "Si has puntuado un restaurante que ya estaba, no sale aquí.",
        ),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", {
          name: "Todavía no has creado ningún restaurante a mano",
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "Añadir restaurante a mano" }),
      ).toHaveAttribute("href", "/restaurants/create/manual");
    });
  });

  describe("When I created Canalla Bistro by hand", () => {
    it("Then I should see that restaurant", () => {
      render(<MyRestaurantsPage restaurants={[canalla]} />);

      expect(
        screen.getByRole("heading", { name: "Canalla Bistro" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "Ver Canalla Bistro" }),
      ).toHaveAttribute("href", "/restaurants/31");
    });
  });
});
