export type Location = {
  locationId: number;
  name: string;
  coordinates: {
    lat: number;
    lon: number;
    pinPoint?: { country: string; city: string; state: string };
  };
  timezone: {
    offsetSeconds: number;
    offsetHours: number;
    observedAtLocal: string;
    utcSeconds: number;
  };
};
