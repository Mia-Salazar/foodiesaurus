import { describe, expect, it } from "vitest";
import { hasValue } from "./hasValue";

describe("Given an empty value or the legacy 0", () => {
  describe("When I check if it should be shown", () => {
    it("Then I should hide it", () => {
      expect(hasValue(undefined)).toBe(false);
      expect(hasValue("")).toBe(false);
      expect(hasValue("   ")).toBe(false);
      expect(hasValue("0")).toBe(false);
      expect(hasValue(" 0 ")).toBe(false);
    });
  });
});

describe("Given a real phone, website or zip", () => {
  describe("When I check if it should be shown", () => {
    it("Then I should keep it", () => {
      expect(hasValue("688646246")).toBe(true);
      expect(hasValue("28006")).toBe(true);
      expect(hasValue("https://frikipizza.es")).toBe(true);
    });
  });
});
