export function FormatWeightToKilograms(weightInHectograms: number): string {
  const weightInKilograms = weightInHectograms / 10;
  return weightInKilograms.toFixed(1);
}
