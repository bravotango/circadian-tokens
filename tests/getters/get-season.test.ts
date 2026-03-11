// tests/getters/getSeason.test.ts
import { getSeason } from "../../src/getters/";

describe("getSeason", () => {
  describe("Northern Hemisphere", () => {
    const northernLatitude = 47.6062; // Seattle

    it("returns 'spring' for Mar 20 – Jun 20", () => {
      expect(
        getSeason({ date: new Date("2024-03-19"), latitude: northernLatitude }),
      ).toBe("winter");
      expect(
        getSeason({ date: new Date("2024-03-20"), latitude: northernLatitude }),
      ).toBe("spring");
      expect(
        getSeason({ date: new Date("2024-04-15"), latitude: northernLatitude }),
      ).toBe("spring");
      expect(
        getSeason({ date: new Date("2024-06-20"), latitude: northernLatitude }),
      ).toBe("spring");
      expect(
        getSeason({ date: new Date("2024-06-21"), latitude: northernLatitude }),
      ).toBe("summer");
    });

    it("returns 'summer' for Jun 21 – Sep 22", () => {
      expect(
        getSeason({ date: new Date("2024-06-21"), latitude: northernLatitude }),
      ).toBe("summer");
      expect(
        getSeason({ date: new Date("2024-07-15"), latitude: northernLatitude }),
      ).toBe("summer");
      expect(
        getSeason({ date: new Date("2024-09-22"), latitude: northernLatitude }),
      ).toBe("summer");
      expect(
        getSeason({ date: new Date("2024-09-23"), latitude: northernLatitude }),
      ).toBe("autumn");
    });

    it("returns 'autumn' for Sep 23 – Dec 20", () => {
      expect(
        getSeason({ date: new Date("2024-09-23"), latitude: northernLatitude }),
      ).toBe("autumn");
      expect(
        getSeason({ date: new Date("2024-10-15"), latitude: northernLatitude }),
      ).toBe("autumn");
      expect(
        getSeason({ date: new Date("2024-12-20"), latitude: northernLatitude }),
      ).toBe("autumn");
      expect(
        getSeason({ date: new Date("2024-12-21"), latitude: northernLatitude }),
      ).toBe("winter");
    });

    it("returns 'winter' for Dec 21 – Mar 19", () => {
      expect(
        getSeason({ date: new Date("2024-12-21"), latitude: northernLatitude }),
      ).toBe("winter");
      expect(
        getSeason({ date: new Date("2025-01-15"), latitude: northernLatitude }),
      ).toBe("winter");
      expect(
        getSeason({ date: new Date("2025-03-19"), latitude: northernLatitude }),
      ).toBe("winter");
      expect(
        getSeason({ date: new Date("2025-03-20"), latitude: northernLatitude }),
      ).toBe("spring");
    });
  });

  describe("Southern Hemisphere", () => {
    const southernLatitude = -33.8688; // Sydney

    it("returns 'autumn' for Mar 20 – Jun 20", () => {
      expect(
        getSeason({ date: new Date("2024-03-19"), latitude: southernLatitude }),
      ).toBe("summer");
      expect(
        getSeason({ date: new Date("2024-03-20"), latitude: southernLatitude }),
      ).toBe("autumn");
      expect(
        getSeason({ date: new Date("2024-04-15"), latitude: southernLatitude }),
      ).toBe("autumn");
      expect(
        getSeason({ date: new Date("2024-06-20"), latitude: southernLatitude }),
      ).toBe("autumn");
      expect(
        getSeason({ date: new Date("2024-06-21"), latitude: southernLatitude }),
      ).toBe("winter");
    });

    it("returns 'winter' for Jun 21 – Sep 22", () => {
      expect(
        getSeason({ date: new Date("2024-06-21"), latitude: southernLatitude }),
      ).toBe("winter");
      expect(
        getSeason({ date: new Date("2024-07-15"), latitude: southernLatitude }),
      ).toBe("winter");
      expect(
        getSeason({ date: new Date("2024-09-22"), latitude: southernLatitude }),
      ).toBe("winter");
      expect(
        getSeason({ date: new Date("2024-09-23"), latitude: southernLatitude }),
      ).toBe("spring");
    });

    it("returns 'spring' for Sep 23 – Dec 20", () => {
      expect(
        getSeason({ date: new Date("2024-09-23"), latitude: southernLatitude }),
      ).toBe("spring");
      expect(
        getSeason({ date: new Date("2024-10-15"), latitude: southernLatitude }),
      ).toBe("spring");
      expect(
        getSeason({ date: new Date("2024-12-20"), latitude: southernLatitude }),
      ).toBe("spring");
      expect(
        getSeason({ date: new Date("2024-12-21"), latitude: southernLatitude }),
      ).toBe("summer");
    });

    it("returns 'summer' for Dec 21 – Mar 19", () => {
      expect(
        getSeason({ date: new Date("2024-12-21"), latitude: southernLatitude }),
      ).toBe("summer");
      expect(
        getSeason({ date: new Date("2025-01-15"), latitude: southernLatitude }),
      ).toBe("summer");
      expect(
        getSeason({ date: new Date("2025-03-19"), latitude: southernLatitude }),
      ).toBe("summer");
      expect(
        getSeason({ date: new Date("2025-03-20"), latitude: southernLatitude }),
      ).toBe("autumn");
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
