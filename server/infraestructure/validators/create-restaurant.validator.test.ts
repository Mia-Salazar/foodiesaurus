import { describe, expect, it } from "vitest";
import { createRestaurantSchema } from "./create-restaurant.validator";

describe("Given the data of a new restaurant", () => {
  describe("When the optional fields are empty", () => {
    it("Then they should be left out", () => {
      const parsed = createRestaurantSchema.parse({
        name: "  Canalla Bistro ",
        province: "Valencia",
        address: "Carrer de la Llotja, 2",
        zip: "",
        phone: "  ",
      });

      expect(parsed).toEqual({
        name: "Canalla Bistro",
        province: "Valencia",
        address: "Carrer de la Llotja, 2",
      });
    });
  });

  describe("When the name, province or address is missing", () => {
    it("Then the data should be rejected", () => {
      const parsed = createRestaurantSchema.safeParse({
        name: " ",
        province: "",
        address: "",
      });

      expect(parsed.success).toBe(false);
      expect(Object.keys(parsed.error!.flatten().fieldErrors).sort()).toEqual([
        "address",
        "name",
        "province",
      ]);
    });
  });

  describe("When the name is longer than 40 characters", () => {
    it("Then the data should be rejected", () => {
      const parsed = createRestaurantSchema.safeParse({
        name: "a".repeat(41),
        province: "Valencia",
        address: "Carrer de la Llotja, 2",
      });

      expect(parsed.success).toBe(false);
    });
  });
});
