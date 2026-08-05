import { HealthCheckRating } from "../types";

export interface HealthRatingMeta {
  value: HealthCheckRating;
  short: string;
  label: string;
  color: string;
}

export const healthRatingMeta: HealthRatingMeta[] = [
  {
    value: HealthCheckRating.Healthy,
    short: "Great",
    label: "Great",
    color: "text-emerald-500",
  },
  {
    value: HealthCheckRating.LowRisk,
    short: "Good",
    label: "Good",
    color: "text-teal-500",
  },
  {
    value: HealthCheckRating.HighRisk,
    short: "Moderate",
    label: "Moderate risk",
    color: "text-amber-500",
  },
  {
    value: HealthCheckRating.CriticalRisk,
    short: "High",
    label: "High risk",
    color: "text-rose-500",
  },
];
