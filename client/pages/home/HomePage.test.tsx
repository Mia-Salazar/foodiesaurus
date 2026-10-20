import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { mockPush } from "@/vitest.setup";
import { HomePage } from "./HomePage";

function searchForm() {
  return screen.getByRole("heading", { name: /busca un restaurante/i }).closest(
    "section",
  ) as HTMLElement;
}

describe("Given I am a visitor", () => {
  describe("When I open the home page", () => {
    beforeEach(() => {
      render(<HomePage />);
    });

    it("Then I should see Rita", () => {
      expect(
        screen.getByRole("img", { name: "Rita, la dinosaurita, comiendo pizza" }),
      ).toBeInTheDocument();
    });

    it("And I should see her catchphrase", () => {
      expect(
        screen.getByRole("heading", {
          level: 1,
          name: /el meteorito no me extinguió/i,
        }),
      ).toBeInTheDocument();
      expect(screen.getByText(/rita, la dinosaurita/i)).toBeInTheDocument();
    });
  });
});

describe("Given I am on the home page", () => {
  beforeEach(() => {
    render(<HomePage />);
  });

  describe("When I type Friki and ask to search", () => {
    beforeEach(async () => {
      const user = userEvent.setup();
      await user.type(within(searchForm()).getByLabelText("Nombre"), "Friki");
      await user.click(within(searchForm()).getByRole("button", { name: "Buscar" }));
    });

    it("Then I should go to the Madrid results for Friki", () => {
      expect(mockPush).toHaveBeenCalledWith("/restaurants?province=Madrid&term=Friki");
    });
  });

  describe("When I ask to search without typing a name", () => {
    beforeEach(async () => {
      const user = userEvent.setup();
      await user.click(within(searchForm()).getByRole("button", { name: "Buscar" }));
    });

    it("Then I should go to the Madrid results without a term", () => {
      expect(mockPush).toHaveBeenCalledWith("/restaurants?province=Madrid");
    });
  });
});
