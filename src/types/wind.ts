// src/types/wind.ts
export type Wind = {
  speed: number; // meters/sec or mph (be explicit later)
  directionFrom: string; // degrees, 0–360 (meteorological standard) converted to direction
};
