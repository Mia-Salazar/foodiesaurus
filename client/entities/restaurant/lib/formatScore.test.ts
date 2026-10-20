import { describe, expect, it } from "vitest";
import { formatScore } from "./formatScore";

describe("Given a whole number score", () => {
  describe("When I format it", () => {
    it("Then I should see it without decimals", () => {
      expect(formatScore(10)).toBe("10");
      expect(formatScore(0)).toBe("0");
    });
  });
});

describe("Given a decimal score", () => {
  describe("When I format it", () => {
    it("Then I should see a comma and a single decimal place", () => {
      expect(formatScore(9.5)).toBe("9,5");
      expect(formatScore(8.333333333333334)).toBe("8,3");
    });
  });
});
