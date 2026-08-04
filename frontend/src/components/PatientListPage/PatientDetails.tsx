import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  CalendarDays,
  IdCard,
  Mars,
  Plus,
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

import { Diagnosis, Patient } from "../../types";
import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";
import { formatDate, initialsOf } from "../../utility/format";
import EntryDetails from "./EntryDetails";
import EntryForm from "./EntryForm";

const genderIcon = (gender: Patient["gender"]) =>
  gender === "male" ? (
    <Mars className="size-4 text-primary" />
  ) : gender === "female" ? (
    <Venus className="size-4 text-primary" />
  ) : (
    <Transgender className="size-4 text-primary" />
  );

const PatientDetails = () => {
  const { id } = useParams<string>();
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      patientService.findById(id).then((res) => setPatient(res));
      diagnosesService.getAllDiagnoses().then((res) => setDiagnoses(res));
    }
  }, [id]);

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
            {patient.ssn ?? "-"}
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="size-4 text-muted-foreground" />
            <span className="text-muted-foreground">Date of birth:</span>
            {patient.dateOfBirth ? formatDate(patient.dateOfBirth) : "-"}
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

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Entries</h2>
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
      ) : (
        patient.entries.map((entry) => (
          <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
        ))
      )}
    </div>
  );
};

export default PatientDetails;
