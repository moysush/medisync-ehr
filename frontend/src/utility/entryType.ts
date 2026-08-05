import { Hospital, ShieldCheck, Stethoscope } from "lucide-react";

export const entryTypeMeta = {
  Hospital: { label: "Hospital", icon: Hospital },
  HealthCheck: { label: "Health check", icon: ShieldCheck },
  OccupationalHealthcare: {
    label: "Occupational",
    icon: Stethoscope,
  },
} as const;
