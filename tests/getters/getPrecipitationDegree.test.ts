// tests/getters/getPrecipitationDegree.test.ts
import { getPrecipitationDegree } from "../../src/getters/getPrecipitationDegree";

describe("getPrecipitationDegree", () => {
  describe("wind from 0-179 degrees (first half)", () => {
    it("returns 40 when speed > 10", () => {
      expect(getPrecipitationDegree(90, 15)).toBe(40);
      expect(getPrecipitationDegree(0, 11)).toBe(40);
      expect(getPrecipitationDegree(179, 20)).toBe(40);
    });

    it("returns 20 when speed is between 1 and 5 (exclusive)", () => {
      expect(getPrecipitationDegree(90, 2)).toBe(20);
      expect(getPrecipitationDegree(45, 4.9)).toBe(20);
      expect(getPrecipitationDegree(100, 1.1)).toBe(20);
    });

    it("returns 33 for other speeds", () => {
      expect(getPrecipitationDegree(90, 5)).toBe(33);
      expect(getPrecipitationDegree(90, 10)).toBe(33);
      expect(getPrecipitationDegree(90, 1)).toBe(33);
      expect(getPrecipitationDegree(90, 0)).toBe(33);
    });
  });

  describe("wind from 181-359 degrees (second half)", () => {
    it("returns -40 when speed > 10", () => {
      expect(getPrecipitationDegree(270, 15)).toBe(-40);
      expect(getPrecipitationDegree(181, 11)).toBe(-40);
      expect(getPrecipitationDegree(359, 20)).toBe(-40);
    });

    it("returns -20 when speed is between 1 and 5 (exclusive)", () => {
      expect(getPrecipitationDegree(270, 2)).toBe(-20);
      expect(getPrecipitationDegree(200, 4.9)).toBe(-20);
      expect(getPrecipitationDegree(300, 1.1)).toBe(-20);
    });

    it("returns -33 for other speeds", () => {
      expect(getPrecipitationDegree(270, 5)).toBe(-33);
      expect(getPrecipitationDegree(270, 10)).toBe(-33);
      expect(getPrecipitationDegree(270, 1)).toBe(-33);
      expect(getPrecipitationDegree(270, 0)).toBe(-33);
    });
  });

  describe("edge cases", () => {
    it("returns 0 for degree 180", () => {
      expect(getPrecipitationDegree(180, 5)).toBe(0);
      expect(getPrecipitationDegree(180, 15)).toBe(0);
    });

    it("returns 0 for degree 360", () => {
      expect(getPrecipitationDegree(360, 5)).toBe(0);
      expect(getPrecipitationDegree(360, 15)).toBe(0);
    });

    it("returns 0 for degrees outside 0-360 range", () => {
      expect(getPrecipitationDegree(-10, 5)).toBe(0);
      expect(getPrecipitationDegree(400, 5)).toBe(0);
    });
  });
});
