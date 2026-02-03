// tests/getters/getWindDirection.test.ts
import { getWindDirection } from "../../src/getters/getWindDirection";

describe("getWindDirection", () => {
  describe("cardinal directions", () => {
    it("returns 'N' for north (337.5° to 22.5°)", () => {
      expect(getWindDirection(0)).toBe("N");
      expect(getWindDirection(337.5)).toBe("N");
      expect(getWindDirection(22.4)).toBe("N");
    });

    it("returns 'E' for east (67.5° to 112.5°)", () => {
      expect(getWindDirection(90)).toBe("E");
      expect(getWindDirection(67.5)).toBe("E");
      expect(getWindDirection(112.4)).toBe("E");
    });

    it("returns 'S' for south (157.5° to 202.5°)", () => {
      expect(getWindDirection(180)).toBe("S");
      expect(getWindDirection(157.5)).toBe("S");
      expect(getWindDirection(202.4)).toBe("S");
    });

    it("returns 'W' for west (247.5° to 292.5°)", () => {
      expect(getWindDirection(270)).toBe("W");
      expect(getWindDirection(247.5)).toBe("W");
      expect(getWindDirection(292.4)).toBe("W");
    });
  });

  describe("intercardinal directions", () => {
    it("returns 'NE' for northeast (22.5° to 67.5°)", () => {
      expect(getWindDirection(45)).toBe("NE");
      expect(getWindDirection(22.5)).toBe("NE");
      expect(getWindDirection(67.4)).toBe("NE");
    });

    it("returns 'SE' for southeast (112.5° to 157.5°)", () => {
      expect(getWindDirection(135)).toBe("SE");
      expect(getWindDirection(112.5)).toBe("SE");
      expect(getWindDirection(157.4)).toBe("SE");
    });

    it("returns 'SW' for southwest (202.5° to 247.5°)", () => {
      expect(getWindDirection(225)).toBe("SW");
      expect(getWindDirection(202.5)).toBe("SW");
      expect(getWindDirection(247.4)).toBe("SW");
    });

    it("returns 'NW' for northwest (292.5° to 337.5°)", () => {
      expect(getWindDirection(315)).toBe("NW");
      expect(getWindDirection(292.5)).toBe("NW");
      expect(getWindDirection(337.4)).toBe("NW");
    });
  });

  describe("boundary cases", () => {
    it("handles exact boundary values correctly", () => {
      expect(getWindDirection(22.5)).toBe("NE");
      expect(getWindDirection(67.5)).toBe("E");
      expect(getWindDirection(112.5)).toBe("SE");
      expect(getWindDirection(157.5)).toBe("S");
      expect(getWindDirection(202.5)).toBe("SW");
      expect(getWindDirection(247.5)).toBe("W");
      expect(getWindDirection(292.5)).toBe("NW");
      expect(getWindDirection(337.5)).toBe("N");
    });
  });

  describe("edge cases", () => {
    it("returns 'NA' for invalid degrees", () => {
      expect(getWindDirection(-10)).toBe("NA");
      expect(getWindDirection(400)).toBe("NA");
      expect(getWindDirection(-1)).toBe("NA");
      expect(getWindDirection(360)).toBe("NA");
      expect(getWindDirection(361)).toBe("NA");
    });
  });
});
