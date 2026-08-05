import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronRight,
  ClipboardList,
  Mars,
  Plus,
  SearchX,
  Transgender,
  Users,
  Venus,
} from "lucide-react";
import { toast } from "sonner";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { Gender, Patient, PatientFormValues } from "../../types";
import AddPatientModal from "../AddPatientModal";
import SearchInput from "../SearchInput";
import patientService from "../../services/patients";
import { getErrorMessage } from "../../utility/errorMessage";
import { genderLabel, initialsOf } from "../../utility/format";

interface Props {
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
  loading: boolean;
}

const headCellClass = "px-4 text-sm font-medium text-muted-foreground";

const PatientListPage = ({ patients, setPatients, loading }: Props) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [query, setQuery] = useState<string>("");

  const stats = useMemo(
    () => ({
      total: patients.length,
      male: patients.filter((p) => p.gender === Gender.Male).length,
      female: patients.filter((p) => p.gender === Gender.Female).length,
      other: patients.filter((p) => p.gender === Gender.Other).length,
      entries: patients.reduce((sum, p) => sum + p.entries.length, 0),
    }),
    [patients],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return patients;
    return patients.filter((p) =>
      [p.name, p.occupation]
        .filter(Boolean)
        .some((field) => field!.toLowerCase().includes(q)),
    );
  }, [patients, query]);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const patient = await patientService.createPatient(values);
      setPatients((prev) => prev.concat(patient));
      setModalOpen(false);
      toast.success(`${patient.name} added to the directory`);
    } catch (e: unknown) {
      const message = getErrorMessage(e);
      setError(message);
      toast.error(message);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Patient Directory</h1>
          <p className="text-sm text-muted-foreground">
            View and manage patient records
          </p>
        </div>
        <Button onClick={openModal}>
          <Plus />
          Add Patient
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {[
          { label: "Total Patients", value: stats.total, icon: Users },
          { label: "Male", value: stats.male, icon: Mars },
          { label: "Female", value: stats.female, icon: Venus },
          { label: "Other", value: stats.other, icon: Transgender },
          { label: "Entries", value: stats.entries, icon: ClipboardList },
        ].map(({ label, value, icon: Icon }) => (
          <Card key={label}>
            <CardContent className="flex items-center gap-3">
              {Icon && (
                <span className="flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
              )}
              <div>
                <p className="text-3xl font-bold leading-none tracking-tight">{value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <SearchInput
        className="w-full max-w-sm"
        placeholder="Search by name or occupation..."
        value={query}
        onChange={setQuery}
      />

      <Card>
        <CardContent className="p-0">
          <Table className="text-[15px]">
            <TableHeader>
              <TableRow>
                <TableHead className={`${headCellClass} w-[30%]`}>Name</TableHead>
                <TableHead className={`${headCellClass} w-32`}>Gender</TableHead>
                <TableHead className={headCellClass}>Occupation</TableHead>
                <TableHead className={`${headCellClass} w-24 text-right`}>
                  Entries
                </TableHead>
                <TableHead className="w-8 px-2 text-sm font-medium text-muted-foreground" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      {["w-28", "w-20", "w-32", "w-10"].map(
                        (width, j) => (
                          <TableCell
                            key={j}
                            className={`px-4 py-3 ${j === 3 ? "text-right" : ""}`}
                          >
                            {j === 0 ? (
                              <div className="flex items-center gap-3">
                                <Skeleton className="size-8 rounded-full" />
                                <Skeleton className={`h-5 ${width}`} />
                              </div>
                            ) : (
                              <Skeleton className={`h-5 ${width}`} />
                            )}
                          </TableCell>
                        ),
                      )}
                      <TableCell className="px-2 py-3">
                        <Skeleton className="ml-auto h-4 w-4" />
                      </TableCell>
                    </TableRow>
                  ))
                : filtered.map((patient: Patient) => (
                    <TableRow
                      key={patient.id}
                      className="group cursor-pointer"
                      onClick={() => navigate(`/patients/${patient.id}`)}
                    >
                      <TableCell className="px-4 py-3">
                        <Link
                          to={`/patients/${patient.id}`}
                          className="flex items-center gap-3 font-medium"
                        >
                          <Avatar className="size-8">
                            <AvatarFallback>
                              {initialsOf(patient.name)}
                            </AvatarFallback>
                          </Avatar>
                          {patient.name}
                        </Link>
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        <Badge variant="secondary">
                          {genderLabel(patient.gender)}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-3">
                        {patient.occupation || (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-right font-medium tabular-nums">
                        {patient.entries.length}
                      </TableCell>
                      <TableCell className="px-2 py-3">
                        <ChevronRight className="ml-auto size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
          {!loading && filtered.length === 0 && (
            <div className="flex flex-col items-center gap-3 py-12 text-center">
              <SearchX className="size-10 text-muted-foreground" />
              <p className="font-medium">No patients found</p>
              <p className="text-sm text-muted-foreground">
                {query
                  ? `Nothing matches "${query}". Try a different search.`
                  : "Add your first patient to get started."}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
    </div>
  );
};

export default PatientListPage;
