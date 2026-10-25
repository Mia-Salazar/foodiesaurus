import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MyScore, MyScoresPage } from "./MyScoresPage";

const canalla: MyScore = {
  id: 15,
  restaurantId: 31,
  restaurantName: "Canalla Bistro",
  createdAt: "2023-08-04T12:00:00.000Z",
  generalScore: 9,
  allergenChart: true,
  fidelityScore: 8,
  attentionScore: 9,
  allergicReaction: false,
  comment: "Buena atención",
};

function fact(label: string, value: string) {
  return screen.getByText((_, node) => {
    return node?.tagName === "LI" && node.textContent === `${label}: ${value}`;
  });
}

describe("Given I open my opinions", () => {
  describe("When I have not left any opinion", () => {
    it("Then I should be told that this list is empty", () => {
      render(<MyScoresPage scores={[]} />);

      expect(
        screen.getByRole("heading", { level: 1, name: "Mis opiniones" }),
      ).toBeInTheDocument();
      expect(
        screen.getByText("Aquí ves las opiniones que has dejado."),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: "Todavía no has dejado ninguna opinión" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "Buscar restaurantes" }),
      ).toHaveAttribute("href", "/restaurants");
    });
  });

  describe("When I scored Canalla Bistro", () => {
    it("Then I should see that opinion and a way to open the restaurant", () => {
      render(<MyScoresPage scores={[canalla]} />);

      expect(
        screen.getByRole("heading", { name: "Canalla Bistro" }),
      ).toBeInTheDocument();
      expect(screen.getByText("4 de agosto de 2023")).toBeInTheDocument();
      expect(screen.getByLabelText("Puntuación general 9 de 10")).toBeInTheDocument();
      expect(fact("Carta de alérgenos", "Sí")).toBeInTheDocument();
      expect(fact("Calidad de la carta", "8/10")).toBeInTheDocument();
      expect(fact("Atención", "9/10")).toBeInTheDocument();
      expect(fact("Reacción alérgica", "No")).toBeInTheDocument();
      expect(screen.getByText("Buena atención")).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "Ver Canalla Bistro" }),
      ).toHaveAttribute("href", "/restaurants/31");
      expect(
        screen.getByRole("link", { name: "Editar puntuación de Canalla Bistro" }),
      ).toHaveAttribute("href", "/profile/scores/15/edit");
    });
  });

  describe("When I said the restaurant had no allergen chart", () => {
    it("Then I should not see a chart quality", () => {
      render(
        <MyScoresPage
          scores={[{ ...canalla, allergenChart: false, fidelityScore: 0, comment: undefined }]}
        />,
      );

      expect(fact("Carta de alérgenos", "No")).toBeInTheDocument();
      expect(screen.queryByText(/Calidad de la carta/)).not.toBeInTheDocument();
      expect(screen.queryByText("Buena atención")).not.toBeInTheDocument();
    });
  });
});
