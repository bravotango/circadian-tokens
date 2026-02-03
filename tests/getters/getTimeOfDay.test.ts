// tests/getters/getTimeOfDay.test.ts
import { getTimeOfDay } from "../../src/getters/getTimeOfDay";

describe("getTimeOfDay", () => {
  beforeEach(() => {
    // Reset any mocked timers before each test
    jest.useRealTimers();
  });

  it("returns 'night' when current time is before sunrise", () => {
    const sunrise = new Date("2024-07-15T06:00:00");
    const sunset = new Date("2024-07-15T20:00:00");
    const currentTime = new Date("2024-07-15T04:00:00");

    jest.useFakeTimers();
    jest.setSystemTime(currentTime);

    expect(getTimeOfDay({ sunrise, sunset })).toBe("night");
  });

  it("returns 'sunrise' when current time is within 1 hour after sunrise", () => {
    const sunrise = new Date("2024-07-15T06:00:00");
    const sunset = new Date("2024-07-15T20:00:00");
    const currentTime = new Date("2024-07-15T06:30:00");

    jest.useFakeTimers();
    jest.setSystemTime(currentTime);

    expect(getTimeOfDay({ sunrise, sunset })).toBe("sunrise");
  });

  it("returns 'day' when current time is between sunrise+1hr and sunset-1hr", () => {
    const sunrise = new Date("2024-07-15T06:00:00");
    const sunset = new Date("2024-07-15T20:00:00");
    const currentTime = new Date("2024-07-15T13:00:00");

    jest.useFakeTimers();
    jest.setSystemTime(currentTime);

    expect(getTimeOfDay({ sunrise, sunset })).toBe("day");
  });

  it("returns 'sunset' when current time is within 1 hour before sunset", () => {
    const sunrise = new Date("2024-07-15T06:00:00");
    const sunset = new Date("2024-07-15T20:00:00");
    const currentTime = new Date("2024-07-15T19:30:00");

    jest.useFakeTimers();
    jest.setSystemTime(currentTime);

    expect(getTimeOfDay({ sunrise, sunset })).toBe("sunset");
  });

  it("returns 'night' when current time is after sunset", () => {
    const sunrise = new Date("2024-07-15T06:00:00");
    const sunset = new Date("2024-07-15T20:00:00");
    const currentTime = new Date("2024-07-15T22:00:00");

    jest.useFakeTimers();
    jest.setSystemTime(currentTime);

    expect(getTimeOfDay({ sunrise, sunset })).toBe("night");
  });

  describe("boundary cases", () => {
    it("returns 'sunrise' exactly at sunrise time", () => {
      const sunrise = new Date("2024-07-15T06:00:00");
      const sunset = new Date("2024-07-15T20:00:00");
      const currentTime = new Date("2024-07-15T06:00:00");

      jest.useFakeTimers();
      jest.setSystemTime(currentTime);

      expect(getTimeOfDay({ sunrise, sunset })).toBe("sunrise");
    });

    it("returns 'day' exactly 1 hour after sunrise", () => {
      const sunrise = new Date("2024-07-15T06:00:00");
      const sunset = new Date("2024-07-15T20:00:00");
      const currentTime = new Date("2024-07-15T07:00:00");

      jest.useFakeTimers();
      jest.setSystemTime(currentTime);

      expect(getTimeOfDay({ sunrise, sunset })).toBe("day");
    });

    it("returns 'sunset' exactly 1 hour before sunset", () => {
      const sunrise = new Date("2024-07-15T06:00:00");
      const sunset = new Date("2024-07-15T20:00:00");
      const currentTime = new Date("2024-07-15T19:00:00");

      jest.useFakeTimers();
      jest.setSystemTime(currentTime);

      expect(getTimeOfDay({ sunrise, sunset })).toBe("sunset");
    });

    it("returns 'sunset' exactly at sunset time", () => {
      const sunrise = new Date("2024-07-15T06:00:00");
      const sunset = new Date("2024-07-15T20:00:00");
      const currentTime = new Date("2024-07-15T20:00:00");

      jest.useFakeTimers();
      jest.setSystemTime(currentTime);

      expect(getTimeOfDay({ sunrise, sunset })).toBe("sunset");
    });
  });
});
