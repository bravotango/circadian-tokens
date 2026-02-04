// tests/getters/getSeason.test.ts
import { getSeason } from "../../src/getters/";

describe("getSeason", () => {
  describe("Northern Hemisphere", () => {
    const northernLatitude = 47.6062; // Seattle

    it("returns 'spring' for March-May", () => {
      expect(
        getSeason({ date: new Date("2024-03-15"), latitude: northernLatitude }),
      ).toBe("spring");
      expect(
        getSeason({ date: new Date("2024-04-15"), latitude: northernLatitude }),
      ).toBe("spring");
      expect(
        getSeason({ date: new Date("2024-05-15"), latitude: northernLatitude }),
      ).toBe("spring");
    });

    it("returns 'summer' for June-August", () => {
      expect(
        getSeason({ date: new Date("2024-06-15"), latitude: northernLatitude }),
      ).toBe("summer");
      expect(
        getSeason({ date: new Date("2024-07-15"), latitude: northernLatitude }),
      ).toBe("summer");
      expect(
        getSeason({ date: new Date("2024-08-15"), latitude: northernLatitude }),
      ).toBe("summer");
    });

    it("returns 'autumn' for September-November", () => {
      expect(
        getSeason({ date: new Date("2024-09-15"), latitude: northernLatitude }),
      ).toBe("autumn");
      expect(
        getSeason({ date: new Date("2024-10-15"), latitude: northernLatitude }),
      ).toBe("autumn");
      expect(
        getSeason({ date: new Date("2024-11-15"), latitude: northernLatitude }),
      ).toBe("autumn");
    });

    it("returns 'winter' for December-February", () => {
      expect(
        getSeason({ date: new Date("2024-12-15"), latitude: northernLatitude }),
      ).toBe("winter");
      expect(
        getSeason({ date: new Date("2024-01-15"), latitude: northernLatitude }),
      ).toBe("winter");
      expect(
        getSeason({ date: new Date("2024-02-15"), latitude: northernLatitude }),
      ).toBe("winter");
    });
  });

  describe("Southern Hemisphere", () => {
    const southernLatitude = -33.8688; // Sydney

    it("returns 'autumn' for March-May", () => {
      expect(
        getSeason({ date: new Date("2024-03-15"), latitude: southernLatitude }),
      ).toBe("autumn");
      expect(
        getSeason({ date: new Date("2024-04-15"), latitude: southernLatitude }),
      ).toBe("autumn");
      expect(
        getSeason({ date: new Date("2024-05-15"), latitude: southernLatitude }),
      ).toBe("autumn");
    });

    it("returns 'winter' for June-August", () => {
      expect(
        getSeason({ date: new Date("2024-06-15"), latitude: southernLatitude }),
      ).toBe("winter");
      expect(
        getSeason({ date: new Date("2024-07-15"), latitude: southernLatitude }),
      ).toBe("winter");
      expect(
        getSeason({ date: new Date("2024-08-15"), latitude: southernLatitude }),
      ).toBe("winter");
    });

    it("returns 'spring' for September-November", () => {
      expect(
        getSeason({ date: new Date("2024-09-15"), latitude: southernLatitude }),
      ).toBe("spring");
      expect(
        getSeason({ date: new Date("2024-10-15"), latitude: southernLatitude }),
      ).toBe("spring");
      expect(
        getSeason({ date: new Date("2024-11-15"), latitude: southernLatitude }),
      ).toBe("spring");
    });

    it("returns 'summer' for December-February", () => {
      expect(
        getSeason({ date: new Date("2024-12-15"), latitude: southernLatitude }),
      ).toBe("summer");
      expect(
        getSeason({ date: new Date("2024-01-15"), latitude: southernLatitude }),
      ).toBe("summer");
      expect(
        getSeason({ date: new Date("2024-02-15"), latitude: southernLatitude }),
      ).toBe("summer");
    });
  });

  describe("edge cases", () => {
    it("treats latitude 0 (equator) as Northern Hemisphere", () => {
      expect(getSeason({ date: new Date("2024-07-15"), latitude: 0 })).toBe(
        "summer",
      );
    });
  });
});
