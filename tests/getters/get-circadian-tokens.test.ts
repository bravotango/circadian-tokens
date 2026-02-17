// tests/getters/getCircadianTokens.test.ts
import { getCircadianTokens } from "../../src/getters";
import { WeatherLocation } from "../../src/types";

// Mock the fetch function
global.fetch = jest.fn();

describe("getCircadianTokens", () => {
  const mockApiKey = "test-api-key-123";

  const mockApiResponse = {
    coord: { lon: -122.3321, lat: 47.6062 },
    weather: [
      {
        id: 800,
        main: "Clear",
        description: "clear sky",
        icon: "01d",
      },
    ],
    main: {
      temp: 72.5,
    },
    wind: {
      speed: 8.5,
      deg: 270,
      gust: 12.3,
    },
    dt: 1721059200, // July 15, 2024 12:00:00 PM UTC
    sys: {
      sunrise: 1721037600, // 6:00 AM UTC
      sunset: 1721084400, // 8:00 PM UTC
    },
    timezone: -25200, // UTC-7 (PDT)
    name: "Seattle",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockApiResponse,
    });

    // Mock current time to be during the day (1:00 PM UTC)
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2024-07-15T13:00:00Z"));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("API key validation", () => {
    it("throws error when API key is missing", async () => {
      const location: WeatherLocation = {
        type: "city",
        city: "Seattle",
      };

      await expect(getCircadianTokens(location, "")).rejects.toThrow(
        "Weather API key is required",
      );
    });
  });

  describe("city-based location", () => {
    it("fetches weather for a city and returns parsed response", async () => {
      const location: WeatherLocation = {
        type: "city",
        city: "Seattle",
      };

      const result = await getCircadianTokens(location, mockApiKey);

      const calledUrl = (fetch as jest.Mock).mock.calls[0][0].toString();
      expect(calledUrl).toContain("q=Seattle");
      expect(calledUrl).toContain(`appid=${mockApiKey}`);
      expect(calledUrl).toContain("units=imperial");

      expect(result.location.name).toBe("Seattle");
      expect(result.location.coordinates).toEqual({
        lat: 47.6062,
        lon: -122.3321,
      });
    });

    it("properly encodes city names with spaces", async () => {
      const location: WeatherLocation = {
        type: "city",
        city: "New York",
      };

      await getCircadianTokens(location, mockApiKey);

      const calledUrl = (fetch as jest.Mock).mock.calls[0][0].toString();
      expect(calledUrl).toContain("q=New%20York");
    });
  });

  describe("coordinate-based location", () => {
    it("fetches weather for coordinates and returns parsed response", async () => {
      const location: WeatherLocation = {
        type: "coords",
        lat: 47.6062,
        lon: -122.3321,
      };

      const result = await getCircadianTokens(location, mockApiKey);

      const calledUrl = (fetch as jest.Mock).mock.calls[0][0].toString();
      expect(calledUrl).toContain("lat=47.6062");
      expect(calledUrl).toContain("lon=-122.3321");

      expect(result.location.coordinates).toEqual({
        lat: 47.6062,
        lon: -122.3321,
      });
    });
  });

  describe("response parsing", () => {
    it("correctly parses all weather data fields", async () => {
      const location: WeatherLocation = {
        type: "city",
        city: "Seattle",
      };

      const result = await getCircadianTokens(location, mockApiKey);

      // Check location data
      expect(result.location.locationId).toBe(800);
      expect(result.location.name).toBe("Seattle");
      expect(result.location.timezone.offsetSeconds).toBe(-25200);
      expect(result.location.timezone.offsetHours).toBe(-7);

      // Check current weather
      expect(result.current.condition).toBe("clear");
      expect(result.current.description).toBe("clear sky");
      expect(result.current.id).toBe(800);
      expect(result.current.icon).toBe("01d");
      expect(result.current.temperature).toBe(72.5);

      // Check wind data
      expect(result.wind.speed).toBe(8.5);
      expect(result.wind.degrees).toBe(270);
      expect(result.wind.directionFrom).toBe("W");
      expect(result.wind.gusts).toBe(12.3);
      expect(result.wind.precipitationDegree).toBe(-33);

      // Check computed fields
      expect(result.season).toBe("summer");
      expect(result.timeOfDay).toBe("day");
    });

    it("uses wind speed as default when gusts are missing", async () => {
      const responseWithoutGusts = {
        ...mockApiResponse,
        wind: {
          speed: 8.5,
          deg: 270,
          // No gust field
        },
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => responseWithoutGusts,
      });

      const location: WeatherLocation = {
        type: "city",
        city: "Seattle",
      };

      const result = await getCircadianTokens(location, mockApiKey);

      expect(result.wind.gusts).toBe(8.5);
    });
  });

  describe("error handling", () => {
    it("throws error when API returns non-ok response", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      const location: WeatherLocation = {
        type: "city",
        city: "InvalidCity",
      };

      await expect(getCircadianTokens(location, mockApiKey)).rejects.toThrow(
        "Weather API error: 404",
      );
    });

    it("throws error when API returns 401 (invalid API key)", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 401,
      });

      const location: WeatherLocation = {
        type: "city",
        city: "Seattle",
      };

      await expect(getCircadianTokens(location, "invalid-key")).rejects.toThrow(
        "Weather API error: 401",
      );
    });
  });
});
