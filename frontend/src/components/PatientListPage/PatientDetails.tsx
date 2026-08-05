import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  CalendarDays,
  IdCard,
  Mars,
  Plus,
  SearchX,
  Transgender,
  Venus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

import { Diagnosis, Entry, Gender, Patient } from "../../types";
import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";
import { formatDate, initialsOf } from "../../utility/format";
import { healthRatingMeta } from "../../utility/healthRating";
import { entryTypeMeta } from "../../utility/entryType";
import SearchInput from "../SearchInput";
import EntryDetails from "./EntryDetails";
import EntryForm from "./EntryForm";

const genderIcon = (gender: Gender) =>
  gender === Gender.Male ? (
    <Mars className="size-4 text-primary" />
  ) : gender === Gender.Female ? (
    <Venus className="size-4 text-primary" />
  ) : (
    <Transgender className="size-4 text-primary" />
  );

const entrySearchText = (entry: Entry, diagnoses: Diagnosis[]): string => {
  const parts: Array<string | undefined> = [
    entry.description,
    entry.specialist,
    formatDate(entry.date),
    entryTypeMeta[entry.type].label,
  ];
  entry.diagnosisCodes?.forEach((code) => {
    parts.push(code, diagnoses.find((d) => d.code === code)?.name);
  });
  switch (entry.type) {
    case "Hospital":
      parts.push(
        formatDate(entry.discharge.date),
        entry.discharge.criteria,
      );
      break;
    case "HealthCheck":
      parts.push(healthRatingMeta[entry.healthCheckRating].label);
      break;
    case "OccupationalHealthcare":
      parts.push(
        entry.employerName,
        entry.sickLeave && formatDate(entry.sickLeave.startDate),
        entry.sickLeave && formatDate(entry.sickLeave.endDate),
      );
      break;
  }
  return parts.filter(Boolean).join(" ").toLowerCase();
};

const PatientDetails = () => {
  const { id } = useParams<string>();
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    if (id) {
      patientService.findById(id).then((res) => setPatient(res));
      diagnosesService.getAllDiagnoses().then((res) => setDiagnoses(res));
    }
  }, [id]);

  const filteredEntries = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return patient?.entries ?? [];
    return (patient?.entries ?? []).filter((entry) =>
      entrySearchText(entry, diagnoses ?? []).includes(q),
    );
  }, [patient, diagnoses, query]);

  if (!patient || !diagnoses) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader className="flex-row items-center gap-4 space-y-0">
          <Avatar size="lg">
            <AvatarFallback>{initialsOf(patient.name)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2">
              {patient.name}
              {genderIcon(patient.gender)}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {patient.occupation}
            </p>
          </div>
          <Badge variant="outline">
            {patient.entries.length}{" "}
            {patient.entries.length === 1 ? "entry" : "entries"}
          </Badge>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 text-base">
          <div className="flex items-center gap-2">
            <IdCard className="size-4 text-muted-foreground" />
            <span className="text-muted-foreground">SSN:</span>
            <span className="font-mono tabular-nums">{patient.ssn ?? "-"}</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="size-4 text-muted-foreground" />
            <span className="text-muted-foreground">Date of birth:</span>
            <span className="font-mono tabular-nums">
              {patient.dateOfBirth ? formatDate(patient.dateOfBirth) : "-"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <BriefcaseBusiness className="size-4 text-muted-foreground" />
            <span className="text-muted-foreground">Occupation:</span>
            {patient.occupation}
          </div>
        </CardContent>
      </Card>

      {showForm && (
        <EntryForm
          id={id}
          patient={patient}
          setPatient={setPatient}
          setShowForm={setShowForm}
          diagnoses={diagnoses}
        />
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-xl font-semibold tracking-tight">Entries</h2>
          <SearchInput
            className="w-72"
            placeholder="Search entries..."
            value={query}
            onChange={setQuery}
          />
          {query && (
            <span className="text-sm leading-none whitespace-nowrap text-muted-foreground">
              {filteredEntries.length} of {patient.entries.length}
            </span>
          )}
        </div>
        {!showForm && (
          <Button onClick={() => setShowForm(true)}>
            <Plus />
            Add Entry
          </Button>
        )}
      </div>

      {patient.entries.length === 0 ? (
        <p className="rounded-2xl border border-dashed p-8 text-center text-muted-foreground">
          No entries yet. Add the first entry to this record.
        </p>
      ) : filteredEntries.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed p-8 text-center">
          <SearchX className="size-10 text-muted-foreground" />
          <p className="font-medium">No entries found</p>
          <p className="text-sm text-muted-foreground">
            Nothing matches "{query}". Try a different search.
          </p>
        </div>
      ) : (
        filteredEntries.map((entry) => (
          <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
        ))
      )}
    </div>
  );
};

export default PatientDetails;
