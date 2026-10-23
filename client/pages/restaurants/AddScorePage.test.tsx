import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockPush } from "@/vitest.setup";
import { AddScorePage } from "./AddScorePage";

const restaurant = { id: 24, name: "Friki Pizza" };

function mockScoreResponse(status = 201) {
  const fetchMock = vi.fn(async () => ({
    ok: status >= 200 && status < 300,
    status,
    json: async () => ({}),
  }));
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

function sentBody(fetchMock: ReturnType<typeof mockScoreResponse>) {
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

async function answerWithoutChart() {
  await answer("¿Tenían carta de alérgenos?", "No");
  await answer("¿Tuviste una reacción alérgica?", "No");
  await userEvent.selectOptions(
    screen.getByLabelText("¿Cómo te atendió el personal?"),
    "7",
  );
}

describe("Given I want to score Friki Pizza", () => {
  describe("When I open the page", () => {
    beforeEach(() => {
      render(<AddScorePage restaurant={restaurant} />);
    });

    it("Then I should see the questions about my visit", () => {
      expect(
        screen.getByRole("heading", { level: 1, name: "Añadir puntuación" }),
      ).toBeInTheDocument();
      expect(screen.getByText("Vas a puntuar Friki Pizza.")).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "Volver a Friki Pizza" }),
      ).toHaveAttribute("href", "/restaurants/24");
      expect(
        screen.getByRole("group", { name: "¿Tenían carta de alérgenos?" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("group", { name: "¿Tuviste una reacción alérgica?" }),
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText("¿Cómo te atendió el personal?"),
      ).toBeRequired();
      expect(screen.getByLabelText("Comentario")).not.toBeRequired();
      expect(
        screen.getByRole("button", { name: "Guardar puntuación" }),
      ).toBeDisabled();
      expect(
        screen.getByText(
          "Responde las preguntas para guardar. El comentario es opcional.",
        ),
      ).toBeInTheDocument();
    });

    it("And I should not be asked about the chart quality yet", () => {
      expect(
        screen.queryByLabelText("¿Cómo era la carta de alérgenos?"),
      ).not.toBeInTheDocument();
    });
  });

  describe("When I say they had an allergen chart", () => {
    beforeEach(async () => {
      render(<AddScorePage restaurant={restaurant} />);
      await answer("¿Tenían carta de alérgenos?", "Sí");
    });

    it("Then I should be asked how good the chart was from 1 to 10", () => {
      const quality = screen.getByLabelText("¿Cómo era la carta de alérgenos?");
      expect(quality).toBeRequired();
      expect(quality.querySelectorAll("option:not([disabled])")).toHaveLength(10);
      expect(
        screen.getByRole("button", { name: "Guardar puntuación" }),
      ).toBeDisabled();
    });
  });

  describe("When I answer the other questions but not the chart quality", () => {
    beforeEach(async () => {
      render(<AddScorePage restaurant={restaurant} />);
      await answer("¿Tenían carta de alérgenos?", "Sí");
      await answer("¿Tuviste una reacción alérgica?", "No");
      await userEvent.selectOptions(
        screen.getByLabelText("¿Cómo te atendió el personal?"),
        "8",
      );
    });

    it("Then I still cannot save the score", () => {
      expect(
        screen.getByRole("button", { name: "Guardar puntuación" }),
      ).toBeDisabled();
    });
  });

  describe("When I answer every question except the comment", () => {
    beforeEach(async () => {
      render(<AddScorePage restaurant={restaurant} />);
      await answerWithoutChart();
    });

    it("Then I can save the score", () => {
      expect(
        screen.getByRole("button", { name: "Guardar puntuación" }),
      ).toBeEnabled();
      expect(
        screen.queryByText(
          "Responde las preguntas para guardar. El comentario es opcional.",
        ),
      ).not.toBeInTheDocument();
    });
  });

  describe("When I answer everything with a chart and a comment and save it", () => {
    let fetchMock: ReturnType<typeof mockScoreResponse>;

    beforeEach(async () => {
      fetchMock = mockScoreResponse();
      render(<AddScorePage restaurant={restaurant} />);
      await answer("¿Tenían carta de alérgenos?", "Sí");
      await userEvent.selectOptions(
        screen.getByLabelText("¿Cómo era la carta de alérgenos?"),
        "9",
      );
      await answer("¿Tuviste una reacción alérgica?", "Sí");
      await userEvent.selectOptions(
        screen.getByLabelText("¿Cómo te atendió el personal?"),
        "10",
      );
      await userEvent.type(
        screen.getByLabelText("Comentario"),
        "Muy buena atención",
      );
      await userEvent.click(
        screen.getByRole("button", { name: "Guardar puntuación" }),
      );
    });

    it("Then my score should be sent for Friki Pizza", () => {
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/restaurants/24/scores",
        expect.objectContaining({ method: "POST" }),
      );
      expect(sentBody(fetchMock)).toEqual({
        hasAllergenChart: true,
        allergenChartQuality: 9,
        hadAllergicReaction: true,
        attentionScore: 10,
        comment: "Muy buena atención",
      });
    });

    it("And I should go back to Friki Pizza", () => {
      expect(mockPush).toHaveBeenCalledWith("/restaurants/24");
    });
  });

  describe("When I save a score without chart and without comment", () => {
    let fetchMock: ReturnType<typeof mockScoreResponse>;

    beforeEach(async () => {
      fetchMock = mockScoreResponse();
      render(<AddScorePage restaurant={restaurant} />);
      await answerWithoutChart();
      await userEvent.click(
        screen.getByRole("button", { name: "Guardar puntuación" }),
      );
    });

    it("Then only the answered questions should be sent", () => {
      expect(sentBody(fetchMock)).toEqual({
        hasAllergenChart: false,
        hadAllergicReaction: false,
        attentionScore: 7,
      });
    });
  });

  describe("When the score cannot be saved", () => {
    beforeEach(async () => {
      mockScoreResponse(500);
      render(<AddScorePage restaurant={restaurant} />);
      await answerWithoutChart();
      await userEvent.click(
        screen.getByRole("button", { name: "Guardar puntuación" }),
      );
    });

    it("Then I should be told to try again", async () => {
      expect(await screen.findByRole("alert")).toHaveTextContent(
        "No hemos podido guardar la puntuación. Prueba otra vez.",
      );
      expect(mockPush).not.toHaveBeenCalled();
    });
  });
});
