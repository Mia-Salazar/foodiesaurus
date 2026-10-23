import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockPush } from "@/vitest.setup";
import { CreateManualRestaurantPage } from "./CreateManualRestaurantPage";

function mockCreateResponse(body: unknown, status = 201) {
  const fetchMock = vi.fn(async () => ({
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  }));
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

async function fillRequiredFields() {
  await userEvent.type(screen.getByLabelText("Nombre"), "Canalla Bistro");
  await userEvent.type(screen.getByLabelText("Dirección"), "Carrer de la Llotja, 2");
  await userEvent.selectOptions(screen.getByLabelText("Provincia"), "Valencia");
}

describe("Given I add a restaurant by hand", () => {
  describe("When I open the page", () => {
    beforeEach(() => {
      render(<CreateManualRestaurantPage />);
    });

    it("Then I should see a form to write the restaurant data", () => {
      expect(
        screen.getByRole("heading", {
          level: 1,
          name: "Añadir restaurante a mano",
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByText("Vas a escribir los datos del restaurante."),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "Volver a añadir restaurante" }),
      ).toHaveAttribute("href", "/restaurants/create");
      expect(screen.getByLabelText("Nombre")).toBeRequired();
      expect(screen.getByLabelText("Dirección")).toBeRequired();
      expect(screen.getByLabelText("Provincia")).toBeRequired();
      expect(screen.getByLabelText("Código postal")).toBeInTheDocument();
      expect(screen.getByLabelText("Teléfono")).toBeInTheDocument();
      expect(screen.getByLabelText("Sitio web")).toBeInTheDocument();
      expect(screen.getByLabelText("Tipo de comida")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Añadir restaurante" }),
      ).toBeInTheDocument();
    });
  });

  describe("When I write the restaurant data and add it", () => {
    let fetchMock: ReturnType<typeof mockCreateResponse>;

    beforeEach(async () => {
      fetchMock = mockCreateResponse({ data: { id: 31, name: "Canalla Bistro" } });
      render(<CreateManualRestaurantPage />);
      await fillRequiredFields();
      await userEvent.type(screen.getByLabelText("Código postal"), "46003");
      await userEvent.type(screen.getByLabelText("Teléfono"), "963551470");
      await userEvent.type(
        screen.getByLabelText("Sitio web"),
        "https://www.canallabistro.com",
      );
      await userEvent.selectOptions(screen.getByLabelText("Tipo de comida"), "Tapas");
      await userEvent.click(
        screen.getByRole("button", { name: "Añadir restaurante" }),
      );
    });

    it("Then the restaurant should be saved with all its data", () => {
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/restaurants",
        expect.objectContaining({ method: "POST" }),
      );
      const [, request] = fetchMock.mock.calls[0] as unknown as [
        string,
        { body: string },
      ];
      expect(JSON.parse(request.body)).toEqual({
        name: "Canalla Bistro",
        address: "Carrer de la Llotja, 2",
        province: "Valencia",
        zip: "46003",
        phone: "963551470",
        url: "https://www.canallabistro.com",
        foodType: "Tapas",
      });
    });

    it("And I should go to add a score to the new restaurant", () => {
      expect(mockPush).toHaveBeenCalledWith("/restaurants/31/scores/create");
    });
  });

  describe("When the restaurant cannot be saved", () => {
    beforeEach(async () => {
      mockCreateResponse({ error: "Internal server error" }, 500);
      render(<CreateManualRestaurantPage />);
      await fillRequiredFields();
      await userEvent.click(
        screen.getByRole("button", { name: "Añadir restaurante" }),
      );
    });

    it("Then I should be told to try again", async () => {
      expect(await screen.findByRole("alert")).toHaveTextContent(
        "No hemos podido guardar el restaurante. Prueba otra vez.",
      );
      expect(mockPush).not.toHaveBeenCalled();
    });
  });
});
