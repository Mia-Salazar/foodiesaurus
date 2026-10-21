import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CreateRestaurantPage } from "./CreateRestaurantPage";

function mockLookupResponse(body: unknown, status = 200) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => ({
      ok: status >= 200 && status < 300,
      status,
      json: async () => body,
    })),
  );
}

describe("Given I am adding a restaurant", () => {
  describe("When I open the page", () => {
    beforeEach(() => {
      render(<CreateRestaurantPage />);
    });

    it("Then I should be asked for the restaurant name", () => {
      expect(
        screen.getByRole("heading", { level: 1, name: "Añadir restaurante" }),
      ).toBeInTheDocument();
      expect(screen.getByLabelText("Nombre")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Buscar" })).toBeInTheDocument();
    });
  });
});

describe("Given Friki Pizza is already in Foodiesaurus", () => {
  describe("When I search for Friki", () => {
    beforeEach(async () => {
      mockLookupResponse({
        data: {
          source: "catalog",
          restaurants: [
            {
              id: 24,
              name: "Friki Pizza",
              province: "Madrid",
              address: "Calle de Alcántara, 71",
              zip: "28006",
            },
          ],
        },
      });
      render(<CreateRestaurantPage />);
      await userEvent.type(screen.getByLabelText("Nombre"), "Friki");
      await userEvent.click(screen.getByRole("button", { name: "Buscar" }));
      await screen.findByRole("heading", { name: "Friki Pizza" });
    });

    it("Then I should go to add a score for that restaurant", () => {
      expect(screen.getByText("Ya está en Foodiesaurus")).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "Añadir puntuación a Friki Pizza" }),
      ).toHaveAttribute("href", "/restaurants/24/scores/create");
      expect(screen.getByText(/calle de alcántara, 71/i)).toBeInTheDocument();
    });
  });
});

describe("Given that name is not in Foodiesaurus", () => {
  describe("And the restaurant directory has Canalla Bistro", () => {
    describe("When I search for Canalla", () => {
      beforeEach(async () => {
        mockLookupResponse({
          data: {
            source: "directory",
            restaurants: [
              {
                sourceId: "N:123",
                name: "Canalla Bistro",
                address: "Carrer de la Llotja, 2, 46003, Valencia",
                province: "Valencia",
              },
            ],
          },
        });
        render(<CreateRestaurantPage />);
        await userEvent.type(screen.getByLabelText("Nombre"), "Canalla");
        await userEvent.click(screen.getByRole("button", { name: "Buscar" }));
        await screen.findByRole("heading", { name: "Canalla Bistro" });
      });

      it("Then I should see the directory restaurant by name and address", () => {
        expect(
          screen.getByRole("heading", {
            name: "Restaurantes de España con ese nombre",
          }),
        ).toBeInTheDocument();
        expect(
          screen.getByText("Carrer de la Llotja, 2, 46003, Valencia"),
        ).toBeInTheDocument();
      });

      it("And I should go to add a score when I choose it", () => {
        const href = screen
          .getByRole("link", { name: "Añadir puntuación a Canalla Bistro" })
          .getAttribute("href");

        expect(href).toContain("/restaurants/create/score?");
        expect(href).toContain("name=Canalla+Bistro");
        expect(href).toContain("address=Carrer+de+la+Llotja%2C+2");
      });
    });
  });

  describe("And the restaurant directory has no matches", () => {
    describe("When I search for an unknown name", () => {
      beforeEach(async () => {
        mockLookupResponse({
          data: { source: "directory", restaurants: [] },
        });
        render(<CreateRestaurantPage />);
        await userEvent.type(screen.getByLabelText("Nombre"), "Inventado");
        await userEvent.click(screen.getByRole("button", { name: "Buscar" }));
        await screen.findByText(/no hemos encontrado un restaurante/i);
      });

      it("Then I should be told to try another name", () => {
        expect(
          screen.getByText(
            "No hemos encontrado un restaurante con ese nombre. Prueba otro nombre.",
          ),
        ).toBeInTheDocument();
      });
    });
  });
});
