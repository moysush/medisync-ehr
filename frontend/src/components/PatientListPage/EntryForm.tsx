import { useState } from "react";
import { ChevronsUpDown, Plus, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import DatePickerField from "../DatePickerField";
import { cn } from "@/lib/utils";

import {
  BaseEntryWithoutId,
  Diagnosis,
  Discharge,
  EntryWithoutId,
  HealthCheckRating,
  Patient,
  SickLeave,
} from "../../types";
import patientService from "../../services/patients";
import { assertNever } from "../../utility/assertNever";
import { getErrorMessage } from "../../utility/errorMessage";
import { healthRatingMeta } from "../../utility/healthRating";

interface EntryFormProps {
  id: string | undefined;
  patient: Patient;
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  diagnoses: Diagnosis[];
}

type EntryType = "HealthCheck" | "Hospital" | "OccupationalHealthcare";

interface EntryFormState {
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: string[];
  entryType: EntryType;
  healthCheckRating: HealthCheckRating;
  discharge: Discharge;
  employerName: string;
  sickLeave: SickLeave;
}

const initialForm: EntryFormState = {
  description: "",
  date: "",
  specialist: "",
  diagnosisCodes: [],
  entryType: "HealthCheck",
  healthCheckRating: HealthCheckRating.Healthy,
  discharge: { date: "", criteria: "" },
  employerName: "",
  sickLeave: { startDate: "", endDate: "" },
};

const EntryForm = ({
  id,
  patient,
  setPatient,
  setShowForm,
  diagnoses,
}: EntryFormProps) => {
  const [form, setForm] = useState<EntryFormState>(initialForm);
  const [codesOpen, setCodesOpen] = useState<boolean>(false);

  const update = <K extends keyof EntryFormState>(
    key: K,
    value: EntryFormState[K],
  ) => setForm((prev) => ({ ...prev, [key]: value }));

  const resetForm = () => setForm(initialForm);

  const onCreateEntry = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!form.description || !form.date || !form.specialist) {
      return toast.error("Please fill in description, date and specialist.");
    }
    if (form.entryType === "Hospital" && !form.discharge.date) {
      return toast.error("Please provide a discharge date.");
    }
    if (form.entryType === "OccupationalHealthcare" && !form.employerName) {
      return toast.error("Please provide the employer name.");
    }

    const baseEntry: BaseEntryWithoutId = {
      description: form.description,
      date: form.date,
      specialist: form.specialist,
      diagnosisCodes: form.diagnosisCodes,
    };

    let newEntry: EntryWithoutId;

    switch (form.entryType) {
      case "HealthCheck":
        newEntry = {
          type: "HealthCheck",
          ...baseEntry,
          healthCheckRating: form.healthCheckRating,
        };
        break;
      case "Hospital":
        newEntry = {
          type: "Hospital",
          ...baseEntry,
          discharge: form.discharge,
        };
        break;
      case "OccupationalHealthcare":
        newEntry = {
          type: "OccupationalHealthcare",
          ...baseEntry,
          employerName: form.employerName,
          sickLeave: form.sickLeave,
        };
        break;
      default:
        return assertNever(form.entryType);
    }

    try {
      if (id && patient) {
        const data = await patientService.createEntry(id, newEntry);
        setPatient({ ...patient, entries: [...patient.entries, data] });
        toast.success("Entry added successfully.");
        resetForm();
        setShowForm(false);
      }
    } catch (error) {
      toast.error(`Error: ${getErrorMessage(error)}`);
    }
  };

  const toggleDiagnosisCode = (code: string) => {
    update(
      "diagnosisCodes",
      form.diagnosisCodes.includes(code)
        ? form.diagnosisCodes.filter((c) => c !== code)
        : [...form.diagnosisCodes, code],
    );
  };

  return (
    <form
      onSubmit={onCreateEntry}
      className="flex flex-col gap-4 rounded-[min(var(--radius-4xl),24px)] border border-border bg-card p-5"
    >
      <h3 className="text-lg font-semibold">New entry</h3>

      <div className="grid gap-1.5">
        <Label>Entry type</Label>
        <Select
          value={form.entryType}
          onValueChange={(value) => update("entryType", value as EntryType)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select entry type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="HealthCheck">Health check</SelectItem>
            <SelectItem value="Hospital">Hospital</SelectItem>
            <SelectItem value="OccupationalHealthcare">
              Occupational healthcare
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="entry-description">Description</Label>
        <Input
          id="entry-description"
          type="text"
          placeholder="Describe the visit, symptoms or findings"
          value={form.description}
          onChange={({ target }) => update("description", target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <DatePickerField
          id="entry-date"
          label="Date"
          value={form.date}
          onChange={(value) => update("date", value)}
        />
        <div className="grid gap-1.5">
          <Label htmlFor="entry-specialist">Specialist</Label>
          <Input
            id="entry-specialist"
            type="text"
            placeholder="e.g. Dr. House"
            value={form.specialist}
            onChange={({ target }) => update("specialist", target.value)}
          />
        </div>
      </div>

      <div className="grid gap-1.5">
        <Label>Diagnosis codes</Label>
        <Popover open={codesOpen} onOpenChange={setCodesOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              role="combobox"
              aria-expanded={codesOpen}
              className="w-full justify-between gap-2 font-normal"
            >
              {form.diagnosisCodes.length === 0 ? (
                <span className="text-muted-foreground">
                  Search diagnosis codes…
                </span>
              ) : (
                <span>
                  {form.diagnosisCodes.length}{" "}
                  {form.diagnosisCodes.length === 1 ? "code" : "codes"} selected
                </span>
              )}
              <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="start">
            <Command>
              <CommandInput placeholder="Search code or name…" />
              <CommandList>
                <CommandEmpty>No diagnosis found.</CommandEmpty>
                <CommandGroup>
                  {diagnoses.map((d) => {
                    const selected = form.diagnosisCodes.includes(d.code);
                    return (
                      <CommandItem
                        key={d.code}
                        value={`${d.code} ${d.name}`}
                        data-checked={selected}
                        onSelect={() => toggleDiagnosisCode(d.code)}
                      >
                        <span className="font-mono font-medium">
                          {d.code}
                        </span>
                        <span className="min-w-0 flex-1 truncate text-muted-foreground">
                          {d.name}
                        </span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        {form.diagnosisCodes.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {form.diagnosisCodes.map((code) => (
              <Badge
                key={code}
                variant="secondary"
                className="gap-1 py-1 pr-1 pl-2.5"
              >
                {code}
                <button
                  type="button"
                  aria-label={`Remove ${code}`}
                  className="flex size-4 items-center justify-center rounded-full hover:bg-muted-foreground/20"
                  onClick={() => toggleDiagnosisCode(code)}
                >
                  <X className="size-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {form.entryType === "HealthCheck" && (
        <div className="grid gap-1.5">
          <Label>Health check rating</Label>
          <div
            role="group"
            aria-label="Health check rating"
            className="grid grid-cols-2 gap-2 sm:grid-cols-4"
          >
            {healthRatingMeta.map(({ value, short }) => {
              const active = form.healthCheckRating === value;
              return (
                <Button
                  key={value}
                  type="button"
                  variant="outline"
                  aria-pressed={active}
                  className={cn(
                    "flex-col gap-0.5 text-xs sm:flex-row sm:gap-1.5",
                    active &&
                      "border-primary bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary",
                  )}
                  onClick={() => update("healthCheckRating", value)}
                >
                  <span className="text-sm font-semibold tabular-nums">
                    {value}
                  </span>
                  <span>{short}</span>
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {form.entryType === "Hospital" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <DatePickerField
            id="discharge-date"
            label="Discharge date"
            value={form.discharge.date}
            onChange={(value) =>
              update("discharge", { ...form.discharge, date: value })
            }
          />
          <div className="grid gap-1.5">
            <Label htmlFor="discharge-criteria">Discharge criteria</Label>
            <Input
              id="discharge-criteria"
              placeholder="e.g. Patient stable, no further care required"
              value={form.discharge.criteria}
              onChange={({ target }) =>
                update("discharge", {
                  ...form.discharge,
                  criteria: target.value,
                })
              }
            />
          </div>
        </div>
      )}

      {form.entryType === "OccupationalHealthcare" && (
        <>
          <div className="grid gap-1.5">
            <Label htmlFor="employer-name">Employer name</Label>
            <Input
              id="employer-name"
              placeholder="e.g. Acme Corp"
              value={form.employerName}
              onChange={({ target }) => update("employerName", target.value)}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <DatePickerField
              id="sickleave-start"
              label="Sick leave start"
              value={form.sickLeave.startDate}
              onChange={(value) =>
                update("sickLeave", { ...form.sickLeave, startDate: value })
              }
            />
            <DatePickerField
              id="sickleave-end"
              label="Sick leave end"
              value={form.sickLeave.endDate}
              onChange={(value) =>
                update("sickLeave", { ...form.sickLeave, endDate: value })
              }
            />
          </div>
        </>
      )}

      <div className="mt-2 flex justify-end gap-2 border-t pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowForm(false)}
        >
          <X />
          Cancel
        </Button>
        <Button type="submit">
          <Plus />
          Add entry
        </Button>
      </div>
    </form>
  );
};

export default EntryForm;
