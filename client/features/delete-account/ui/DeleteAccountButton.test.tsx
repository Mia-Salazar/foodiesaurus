import { signOut } from "next-auth/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { DeleteAccountButton } from "./DeleteAccountButton";

vi.mock("next-auth/react", () => ({
  signOut: vi.fn(async () => undefined),
}));

function mockDelete(status = 204) {
  const fetchMock = vi.fn(async () => ({
    ok: status >= 200 && status < 300,
    status,
  }));
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

describe("Given the button to delete my account", () => {
  beforeEach(() => {
    vi.mocked(signOut).mockClear();
  });

  describe("When I ask to delete it", () => {
    it("Then I should see what will be deleted before it happens", async () => {
      render(<DeleteAccountButton />);

      await userEvent.click(screen.getByRole("button", { name: "Eliminar cuenta" }));

      expect(
        screen.getByText("Esto borra tu cuenta y tus opiniones. Los restaurantes se quedan."),
      ).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Sí, eliminar mi cuenta" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Cancelar" })).toBeInTheDocument();
    });
  });

  describe("When I cancel", () => {
    it("Then my account should stay", async () => {
      render(<DeleteAccountButton />);

      await userEvent.click(screen.getByRole("button", { name: "Eliminar cuenta" }));
      await userEvent.click(screen.getByRole("button", { name: "Cancelar" }));

      expect(screen.getByRole("button", { name: "Eliminar cuenta" })).toBeInTheDocument();
      expect(
        screen.queryByRole("button", { name: "Sí, eliminar mi cuenta" }),
      ).not.toBeInTheDocument();
    });
  });

  describe("When I confirm", () => {
    it("Then my account should be deleted and I should leave the session", async () => {
      const fetchMock = mockDelete();
      render(<DeleteAccountButton />);

      await userEvent.click(screen.getByRole("button", { name: "Eliminar cuenta" }));
      await userEvent.click(screen.getByRole("button", { name: "Sí, eliminar mi cuenta" }));

      expect(fetchMock).toHaveBeenCalledWith("/api/account", { method: "DELETE" });
      expect(signOut).toHaveBeenCalledWith({ redirectTo: "/" });
    });
  });

  describe("When the deletion fails", () => {
    it("Then I should see an error and stay signed in", async () => {
      mockDelete(500);
      render(<DeleteAccountButton />);

      await userEvent.click(screen.getByRole("button", { name: "Eliminar cuenta" }));
      await userEvent.click(screen.getByRole("button", { name: "Sí, eliminar mi cuenta" }));

      expect(
        screen.getByRole("alert"),
      ).toHaveTextContent("No hemos podido eliminar la cuenta. Prueba otra vez.");
      expect(signOut).not.toHaveBeenCalled();
    });
  });
});
