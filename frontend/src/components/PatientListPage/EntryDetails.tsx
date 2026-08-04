import {
  BriefcaseBusiness,
  Heart,
  Hospital,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import { Diagnosis, Entry } from "../../types";
import { assertNever } from "../../utility/assertNever";
import { formatDate } from "../../utility/format";
import { healthRatingMeta } from "../../utility/healthRating";

const entryTypeMeta = {
  Hospital: { label: "Hospital", icon: Hospital },
  HealthCheck: { label: "Health check", icon: ShieldCheck },
  OccupationalHealthcare: {
    label: "Occupational",
    icon: Stethoscope,
  },
} as const;

interface EntryProps {
  entry: Entry;
  diagnoses: Diagnosis[];
}

interface EntryWrapperProps {
  entry: Entry;
  diagnoses: Diagnosis[];
  children?: React.ReactNode;
}

const EntryWrapper = ({ entry, diagnoses, children }: EntryWrapperProps) => {
  const meta = entryTypeMeta[entry.type];

  return (
    <Card>
      <CardContent className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <meta.icon className="size-4" />
          </span>
          <Badge variant="outline">{meta.label}</Badge>
          <span className="text-sm font-medium font-mono tabular-nums">
            {formatDate(entry.date)}
          </span>
          {entry.type === "OccupationalHealthcare" && (
            <Badge variant="secondary" className="gap-1">
              <BriefcaseBusiness className="size-3" />
              {entry.employerName}
            </Badge>
          )}
        </div>

        <p className="text-base">{entry.description}</p>

        {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {entry.diagnosisCodes.map((code) => {
              const diagnosis = diagnoses?.find((d) => d.code === code);
              return (
                <Badge key={code} variant="secondary" className="gap-1 font-mono text-xs">
                  {code}
                  {diagnosis?.name && (
                    <span className="font-sans font-normal text-muted-foreground">
                      {diagnosis.name}
                    </span>
                  )}
                </Badge>
              );
            })}
          </div>
        )}

        {children}

        <p className="text-sm text-muted-foreground">
          Diagnosed by {entry.specialist}
        </p>
      </CardContent>
    </Card>
  );
};

const EntryDetails = ({ entry, diagnoses }: EntryProps) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <EntryWrapper entry={entry} diagnoses={diagnoses}>
          <p className="text-sm">
            <span className="text-muted-foreground">Discharge: </span>
            <span className="font-mono tabular-nums">
              {formatDate(entry.discharge.date)}
            </span>
            {entry.discharge.criteria && ` — ${entry.discharge.criteria}`}
          </p>
        </EntryWrapper>
      );
    case "HealthCheck":
      return (
        <EntryWrapper entry={entry} diagnoses={diagnoses}>
          <Badge variant="secondary" className="gap-1.5">
            <Heart
              className={`size-3 ${healthRatingMeta[entry.healthCheckRating].color}`}
            />
            <span
              className={`font-medium ${healthRatingMeta[entry.healthCheckRating].color}`}
            >
              {healthRatingMeta[entry.healthCheckRating].label}
            </span>
          </Badge>
        </EntryWrapper>
      );
    case "OccupationalHealthcare":
      return (
        <EntryWrapper entry={entry} diagnoses={diagnoses}>
          {entry.sickLeave && (
            <p className="text-sm">
              <span className="text-muted-foreground">Sick leave: </span>
              <span className="font-mono tabular-nums">
                {formatDate(entry.sickLeave.startDate)}
              </span>
              {" — "}
              <span className="font-mono tabular-nums">
                {formatDate(entry.sickLeave.endDate)}
              </span>
            </p>
          )}
        </EntryWrapper>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
