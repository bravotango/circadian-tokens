export type Location = {
  locationId: number;
  name: string;
  coordinates: {
    lat: number;
    lon: number;
  };
  timezone: {
    offsetSeconds: number;
    offsetHours: number;
    observedAtLocal: string;
    utcSeconds: number;
  };
};
