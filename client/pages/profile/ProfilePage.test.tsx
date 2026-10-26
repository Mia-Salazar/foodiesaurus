import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ProfilePage } from "./ProfilePage";

vi.mock("next-auth/react", () => ({
  signOut: vi.fn(async () => undefined),
}));

describe("Given I open my profile", () => {
  describe("When my account has a name, an email and a photo", () => {
    it("Then I should see my account data", () => {
      const { container } = render(
        <ProfilePage
          profile={{
            name: "Mia Salazar",
            email: "mia@example.com",
            image: "https://example.com/mia.jpg",
          }}
          restaurantCount={2}
          scoreCount={1}
        />,
      );

      expect(
        screen.getByRole("heading", { level: 1, name: "Tu perfil" }),
      ).toBeInTheDocument();
      expect(screen.getByText("Aquí ves los datos de tu cuenta.")).toBeInTheDocument();
      expect(screen.getByText("Mia Salazar")).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "mia@example.com" })).toHaveAttribute(
        "href",
        "mailto:mia@example.com",
      );
      expect(container.querySelector("img")).toHaveAttribute("alt", "");
      expect(screen.getByText("2")).toBeInTheDocument();
      expect(screen.getByText("restaurantes a mano")).toBeInTheDocument();
      expect(screen.getByText("1")).toBeInTheDocument();
      expect(screen.getByText("opinión")).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Mis restaurantes" })).toHaveAttribute(
        "href",
        "/profile/restaurants",
      );
      expect(screen.getByRole("link", { name: "Mis opiniones" })).toHaveAttribute(
        "href",
        "/profile/scores",
      );
      expect(
        screen.getByRole("heading", { level: 2, name: "Eliminar cuenta" }),
      ).toBeInTheDocument();
      expect(
        screen.getByText("Puedes borrar tu cuenta y tus opiniones. Los restaurantes se quedan."),
      ).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Eliminar cuenta" })).toBeInTheDocument();
    });
  });

  describe("When my account has no name and no email", () => {
    it("Then I should be told that those data are missing", () => {
      render(<ProfilePage profile={{}} restaurantCount={0} scoreCount={0} />);

      expect(
        screen.getByText("Tu cuenta no tiene nombre ni correo."),
      ).toBeInTheDocument();
      expect(screen.queryByText("Nombre")).not.toBeInTheDocument();
      expect(screen.queryByText("Correo")).not.toBeInTheDocument();
      expect(screen.getAllByText("0")).toHaveLength(2);
      expect(screen.getByText("restaurantes a mano")).toBeInTheDocument();
      expect(screen.getByText("opiniones")).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Mis restaurantes" })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Mis opiniones" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Eliminar cuenta" })).toBeInTheDocument();
    });
  });
});
