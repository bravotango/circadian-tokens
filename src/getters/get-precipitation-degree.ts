export const getPrecipitationDegree = (
  degree: number,
  speed: number,
): number => {
  if (degree >= 0 && degree < 180) {
    if (speed > 10) return 40;
    if (speed < 5 && speed > 1) return 20;
    return 33;
  }
  if (degree < 360 && degree > 180) {
    if (speed > 10) return -40;
    if (speed < 5 && speed > 1) return -20;
    return -33;
  }
  return 0;
};
