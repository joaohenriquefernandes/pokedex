export function FormatHeightToMeters(heightInDecimeters: number): string {
  const heightInMeters = heightInDecimeters / 10;
  return heightInMeters.toFixed(1);
}
