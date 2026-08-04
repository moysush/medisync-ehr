export interface HealthRatingMeta {
  value: number;
  short: string;
  label: string;
  color: string;
}

export const healthRatingMeta: HealthRatingMeta[] = [
  { value: 0, short: "Great", label: "Great", color: "text-green-600" },
  { value: 1, short: "Good", label: "Good", color: "text-yellow-500" },
  {
    value: 2,
    short: "Moderate",
    label: "Moderate risk",
    color: "text-orange-500",
  },
  { value: 3, short: "High", label: "High risk", color: "text-red-600" },
];
