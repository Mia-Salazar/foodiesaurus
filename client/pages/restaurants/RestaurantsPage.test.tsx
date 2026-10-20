import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Restaurant } from "@/client/entities/restaurant/model/types";
import { mockReplace } from "@/vitest.setup";
import { RestaurantsPage } from "./RestaurantsPage";

function restaurant(overrides: Partial<Restaurant> & Pick<Restaurant, "id" | "name">): Restaurant {
  return {
    province: "Madrid",
    address: "Calle Falsa 1",
    zip: "28001",
    phone: "910000000",
    foodType: "Pizza",
    score: 8,
    ...overrides,
  };
}

function mockSearchResponse(restaurants: Restaurant[] | "error") {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => {
      if (restaurants === "error") {
        return { ok: false };
      }

      return {
        ok: true,
        json: async () => ({ data: restaurants }),
      };
    }),
  );
}

describe("When I open the restaurant list without a province", () => {
  beforeEach(() => {
    render(<RestaurantsPage />);
  });

  it("Then I should be asked to choose a province", () => {
    expect(
      screen.getByText(/elige una provincia. así verás los restaurantes de esa zona/i),
    ).toBeInTheDocument();
  });

  it("And I should be able to go back home", () => {
    expect(screen.getAllByRole("link", { name: "Volver al inicio" })[0]).toHaveAttribute(
      "href",
      "/",
    );
  });
});

describe("Given Friki Pizza exists in Madrid", () => {
  describe("When I search for Friki in Madrid", () => {
    beforeEach(async () => {
      mockSearchResponse([
        restaurant({ id: 24, name: "Friki Pizza", score: 10 }),
      ]);
      render(<RestaurantsPage province="Madrid" term="Friki" />);
      await screen.findByRole("heading", { name: "Friki Pizza" });
    });

    it("Then I should see Friki Pizza", () => {
      expect(screen.getByRole("heading", { name: "Friki Pizza" })).toBeInTheDocument();
      expect(screen.getByText(/restaurantes que coinciden con friki/i)).toBeInTheDocument();
    });

    it("And I should be able to open its detail", () => {
    expect(screen.getByRole("link", { name: "Ver Friki Pizza" })).toHaveAttribute(
      "href",
      "/restaurants/24",
    );
    });
  });
});

describe("Given Alfa scores 4", () => {
  describe("And Beta scores 9", () => {
    describe("And I am looking at restaurants in Madrid", () => {
      beforeEach(async () => {
        mockSearchResponse([
          restaurant({ id: 1, name: "Alfa", score: 4 }),
          restaurant({ id: 2, name: "Beta", score: 9 }),
        ]);
        render(<RestaurantsPage province="Madrid" />);
        await screen.findByRole("heading", { name: "Alfa" });
      });

      describe("When I ask to sort from highest score to lowest", () => {
        beforeEach(async () => {
          const user = userEvent.setup();
          await user.selectOptions(screen.getByLabelText("Ordenar"), "score-desc");
        });

        it("Then Beta should appear before Alfa", () => {
          const names = within(screen.getByRole("list"))
            .getAllByRole("heading", { level: 2 })
            .map((heading) => heading.textContent);

          expect(names).toEqual(["Beta", "Alfa"]);
        });

        it("And the sort should be kept in the URL", () => {
          expect(mockReplace).toHaveBeenCalledWith(
            "/restaurants?province=Madrid&sort=score-desc",
          );
        });
      });
    });
  });
});

describe("Given no restaurant matches the search", () => {
  describe("When I search for zzz in Madrid", () => {
    beforeEach(async () => {
      mockSearchResponse([]);
      render(<RestaurantsPage province="Madrid" term="zzz" />);
      await screen.findByRole("heading", { name: "No hay restaurantes con esa búsqueda" });
    });

    it("Then I should see that none were found", () => {
      expect(
        screen.getByRole("heading", { name: "No hay restaurantes con esa búsqueda" }),
      ).toBeInTheDocument();
    });

    it("And I should be able to create a restaurant", () => {
      expect(screen.getByRole("link", { name: "Crear restaurante" })).toHaveAttribute(
        "href",
        "/restaurants/create",
      );
    });
  });
});

describe("Given the restaurant search cannot be completed", () => {
  describe("When I search in Madrid", () => {
    it("Then I should see an error", async () => {
      mockSearchResponse("error");
      render(<RestaurantsPage province="Madrid" />);

      expect(
        await screen.findByText("No hemos podido mostrar los restaurantes. Prueba otra vez."),
      ).toBeInTheDocument();
    });
  });
});
