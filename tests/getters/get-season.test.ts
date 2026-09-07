import { getSeason } from "../../src/getters";

describe("getSeason", () => {
  const northernLatitude = 47.6062;
  const southernLatitude = -33.8688;

  describe("Northern Hemisphere", () => {
    it("returns 'spring' for March through May", () => {
      expect(
        getSeason({
          date: new Date("2024-03-01"),
          latitude: northernLatitude,
        }),
      ).toBe("spring");

      expect(
        getSeason({
          date: new Date("2024-04-15"),
          latitude: northernLatitude,
        }),
      ).toBe("spring");

      expect(
        getSeason({
          date: new Date("2024-05-31"),
          latitude: northernLatitude,
        }),
      ).toBe("spring");
    });

    it("returns 'summer' for June through August", () => {
      expect(
        getSeason({
          date: new Date("2024-06-01"),
          latitude: northernLatitude,
        }),
      ).toBe("summer");

      expect(
        getSeason({
          date: new Date("2024-07-15"),
          latitude: northernLatitude,
        }),
      ).toBe("summer");

      expect(
        getSeason({
          date: new Date("2024-08-31"),
          latitude: northernLatitude,
        }),
      ).toBe("summer");
    });

    it("returns 'autumn' for September through November", () => {
      expect(
        getSeason({
          date: new Date("2024-09-01"),
          latitude: northernLatitude,
        }),
      ).toBe("autumn");

      expect(
        getSeason({
          date: new Date("2024-10-15"),
          latitude: northernLatitude,
        }),
      ).toBe("autumn");

      expect(
        getSeason({
          date: new Date("2024-11-30"),
          latitude: northernLatitude,
        }),
      ).toBe("autumn");
    });

    it("returns 'winter' for December through February", () => {
      expect(
        getSeason({
          date: new Date("2024-12-01"),
          latitude: northernLatitude,
        }),
      ).toBe("winter");

      expect(
        getSeason({
          date: new Date("2025-01-15"),
          latitude: northernLatitude,
        }),
      ).toBe("winter");

      expect(
        getSeason({
          date: new Date("2025-02-28"),
          latitude: northernLatitude,
        }),
      ).toBe("winter");
    });
  });

  describe("Southern Hemisphere", () => {
    it("returns 'autumn' for March through May", () => {
      expect(
        getSeason({
          date: new Date("2024-03-01"),
          latitude: southernLatitude,
        }),
      ).toBe("autumn");

      expect(
        getSeason({
          date: new Date("2024-04-15"),
          latitude: southernLatitude,
        }),
      ).toBe("autumn");

      expect(
        getSeason({
          date: new Date("2024-05-31"),
          latitude: southernLatitude,
        }),
      ).toBe("autumn");
    });

    it("returns 'winter' for June through August", () => {
      expect(
        getSeason({
          date: new Date("2024-06-01"),
          latitude: southernLatitude,
        }),
      ).toBe("winter");

      expect(
        getSeason({
          date: new Date("2024-07-15"),
          latitude: southernLatitude,
        }),
      ).toBe("winter");

      expect(
        getSeason({
          date: new Date("2024-08-31"),
          latitude: southernLatitude,
        }),
      ).toBe("winter");
    });

    it("returns 'spring' for September through November", () => {
      expect(
        getSeason({
          date: new Date("2024-09-01"),
          latitude: southernLatitude,
        }),
      ).toBe("spring");

      expect(
        getSeason({
          date: new Date("2024-10-15"),
          latitude: southernLatitude,
        }),
      ).toBe("spring");

      expect(
        getSeason({
          date: new Date("2024-11-30"),
          latitude: southernLatitude,
        }),
      ).toBe("spring");
    });

    it("returns 'summer' for December through February", () => {
      expect(
        getSeason({
          date: new Date("2024-12-01"),
          latitude: southernLatitude,
        }),
      ).toBe("summer");

      expect(
        getSeason({
          date: new Date("2025-01-15"),
          latitude: southernLatitude,
        }),
      ).toBe("summer");

      expect(
        getSeason({
          date: new Date("2025-02-28"),
          latitude: southernLatitude,
        }),
      ).toBe("summer");
    });
  });

  describe("edge cases", () => {
    it("treats latitude 0 (equator) as Northern Hemisphere", () => {
      expect(
        getSeason({
          date: new Date("2024-07-15"),
          latitude: 0,
        }),
      ).toBe("summer");
    });
  });
});
