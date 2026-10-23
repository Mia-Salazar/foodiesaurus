import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockPush } from "@/vitest.setup";
import { DirectoryRestaurantMatch } from "@/client/features/add-restaurant/model/types";
import { AddDirectoryScorePage } from "./AddDirectoryScorePage";

const restaurant: DirectoryRestaurantMatch = {
  sourceId: "node:123",
  name: "Canalla Bistro",
  address: "Carrer de la Llotja, 2, 46003, Valencia",
  province: "Valencia",
  zip: "46003",
  latitude: 39.47,
  longitude: -0.37,
};

function mockSaveResponse(status = 201) {
  const fetchMock = vi.fn(async () => ({
    ok: status >= 200 && status < 300,
    status,
    json: async () => ({ data: { id: 31 } }),
  }));
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

function sentBody(fetchMock: ReturnType<typeof mockSaveResponse>) {
  const [, request] = fetchMock.mock.calls[0] as unknown as [
    string,
    { body: string },
  ];
  return JSON.parse(request.body);
}

function answer(question: string, option: "Sí" | "No") {
  const group = screen.getByRole("group", { name: question });
  return userEvent.click(
    Array.from(group.querySelectorAll("label")).find(
      (label) => label.textContent === option,
    )!,
  );
}

async function answerTheVisit() {
  await answer("¿Tenían carta de alérgenos?", "Sí");
  await userEvent.selectOptions(
    screen.getByLabelText("¿Cómo era la carta de alérgenos?"),
    "8",
  );
  await answer("¿Tuviste una reacción alérgica?", "No");
  await userEvent.selectOptions(
    screen.getByLabelText("¿Cómo te atendió el personal?"),
    "9",
  );
}

describe("Given I chose Canalla Bistro from the restaurant directory", () => {
  describe("When I open the score page", () => {
    beforeEach(() => {
      mockSaveResponse();
      render(<AddDirectoryScorePage restaurant={restaurant} />);
    });

    it("Then I should score that restaurant before anything is saved", () => {
      expect(
        screen.getByRole("heading", { level: 1, name: "Añadir puntuación" }),
      ).toBeInTheDocument();
      expect(screen.getByText("Vas a puntuar Canalla Bistro.")).toBeInTheDocument();
      expect(
        screen.getByText("Está en Carrer de la Llotja, 2, 46003, Valencia."),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Guardar puntuación" }),
      ).toBeDisabled();
      expect(vi.mocked(fetch)).not.toHaveBeenCalled();
    });
  });

  describe("When I answer the visit and save it", () => {
    let fetchMock: ReturnType<typeof mockSaveResponse>;

    beforeEach(async () => {
      fetchMock = mockSaveResponse();
      render(<AddDirectoryScorePage restaurant={restaurant} />);
      await answerTheVisit();
      await userEvent.click(
        screen.getByRole("button", { name: "Guardar puntuación" }),
      );
    });

    it("Then the restaurant and the score should be saved together", () => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/restaurants/with-score",
        expect.objectContaining({ method: "POST" }),
      );
      expect(sentBody(fetchMock)).toEqual({
        name: "Canalla Bistro",
        address: "Carrer de la Llotja, 2, 46003, Valencia",
        province: "Valencia",
        zip: "46003",
        apiId: "node:123",
        latitude: 39.47,
        longitude: -0.37,
        hasAllergenChart: true,
        allergenChartQuality: 8,
        hadAllergicReaction: false,
        attentionScore: 9,
      });
    });

    it("And I should go to the saved restaurant", () => {
      expect(mockPush).toHaveBeenCalledWith("/restaurants/31");
    });
  });

  describe("When the directory restaurant has no province", () => {
    beforeEach(() => {
      render(
        <AddDirectoryScorePage
          restaurant={{ ...restaurant, province: undefined }}
        />,
      );
    });

    it("Then I should choose a province before saving", async () => {
      await answerTheVisit();
      expect(
        screen.getByRole("button", { name: "Guardar puntuación" }),
      ).toBeDisabled();

      await userEvent.selectOptions(screen.getByLabelText("Provincia"), "Valencia");
      expect(
        screen.getByRole("button", { name: "Guardar puntuación" }),
      ).toBeEnabled();
    });
  });
});
