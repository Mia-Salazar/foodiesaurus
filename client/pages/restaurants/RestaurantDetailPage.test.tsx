import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { RestaurantDetail } from "@/client/entities/restaurant/model/types";
import { RestaurantDetailPage } from "./RestaurantDetailPage";

function detail(overrides: Partial<RestaurantDetail> = {}): RestaurantDetail {
  return {
    id: 24,
    name: "Friki Pizza",
    province: "Madrid",
    address: "Calle de Alcántara, 71",
    zip: "28006",
    url: "https://frikipizza.es/menu.html",
    phone: "688646246",
    foodType: "Pizza",
    latitude: 40.43,
    longitude: -3.67,
    averages: {
      general: 9,
      attention: 10,
      allergenChartPercent: 100,
      fidelity: 9,
      allergicReactionPercent: 0,
      totalReviews: 1,
    },
    reviews: [
      {
        id: 15,
        userName: "Usuario legacy 1",
        createdAt: "2023-08-04T00:00:00.000Z",
        generalScore: 10,
        allergenChart: true,
        fidelityScore: 9,
        attentionScore: 10,
        allergicReaction: false,
        comment: "Muy buena atención y comida",
      },
    ],
    ...overrides,
  };
}

describe("Given Friki Pizza has an address, phone, website, map and a comment", () => {
  describe("When I open its detail", () => {
    beforeEach(() => {
      render(<RestaurantDetailPage restaurant={detail()} />);
    });

    it("Then I should see its name, food type and address", () => {
      expect(screen.getByRole("heading", { level: 1, name: "Friki Pizza" })).toBeInTheDocument();
      expect(screen.getAllByText("Pizza").length).toBeGreaterThan(0);
      expect(screen.getByText(/calle de alcántara, 71/i)).toBeInTheDocument();
    });

    it("And I should be able to call it", () => {
      expect(screen.getByRole("link", { name: "688646246" })).toHaveAttribute(
        "href",
        "tel:688646246",
      );
    });

    it("And I should be able to visit its website", () => {
      expect(screen.getByRole("link", { name: "Visitar web" })).toHaveAttribute(
        "href",
        "https://frikipizza.es/menu.html",
      );
    });

    it("And I should see the map", () => {
      expect(screen.getByRole("link", { name: "Ver en OpenStreetMap" })).toBeInTheDocument();
    });

    it("And I should see the comment", () => {
      expect(screen.getByText("Muy buena atención y comida")).toBeInTheDocument();
    });

    it("And I should be able to go back to the Madrid results", () => {
      expect(screen.getByRole("link", { name: "Volver a restaurantes" })).toHaveAttribute(
        "href",
        "/restaurants?province=Madrid",
      );
    });
  });
});

describe("Given the restaurant phone and zip are the legacy 0", () => {
  describe("And it has no real coordinates", () => {
    describe("When I open its detail", () => {
      beforeEach(() => {
        render(
          <RestaurantDetailPage
            restaurant={detail({
              phone: "0",
              zip: "0",
              latitude: 0,
              longitude: 0,
            })}
          />,
        );
      });

      it("Then I should not see a phone number", () => {
        expect(screen.queryByRole("link", { name: "0" })).not.toBeInTheDocument();
      });

      it("And I should not see a map", () => {
        expect(
          screen.queryByRole("link", { name: "Ver en OpenStreetMap" }),
        ).not.toBeInTheDocument();
      });

      it("And I should still see the address and province", () => {
        expect(screen.getByText("Calle de Alcántara, 71, Madrid")).toBeInTheDocument();
      });
    });
  });
});

describe("Given the restaurant has no averages or comments", () => {
  describe("When I open its detail", () => {
    beforeEach(() => {
      render(
        <RestaurantDetailPage
          restaurant={detail({
            averages: null,
            reviews: [],
          })}
        />,
      );
    });

    it("Then I should see that there are no scores", () => {
      expect(
        screen.getByText("No hay puntuaciones medias para este restaurante"),
      ).toBeInTheDocument();
    });

    it("And I should see that there are no comments", () => {
      expect(screen.getByText("No hay comentarios para este restaurante")).toBeInTheDocument();
    });
  });
});
