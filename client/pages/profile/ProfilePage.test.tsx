import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProfilePage } from "./ProfilePage";

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
      expect(screen.getByRole("link", { name: "Mis restaurantes" })).toHaveAttribute(
        "href",
        "/profile/restaurants",
      );
      expect(screen.getByRole("link", { name: "Mis opiniones" })).toHaveAttribute(
        "href",
        "/profile/scores",
      );
    });
  });

  describe("When my account has no name and no email", () => {
    it("Then I should be told that those data are missing", () => {
      render(<ProfilePage profile={{}} />);

      expect(
        screen.getByText("Tu cuenta no tiene nombre ni correo."),
      ).toBeInTheDocument();
      expect(screen.queryByText("Nombre")).not.toBeInTheDocument();
      expect(screen.queryByText("Correo")).not.toBeInTheDocument();
    });
  });
});
