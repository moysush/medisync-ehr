import { useState, SyntheticEvent } from "react";
import { Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DatePickerField from "../DatePickerField";

import { PatientFormValues, Gender } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: PatientFormValues) => void;
}

interface GenderOption {
  value: Gender;
  label: string;
}

const genderOptions: GenderOption[] = Object.values(Gender).map((v) => ({
  value: v,
  label: v.toString(),
}));

const AddPatientForm = ({ onCancel, onSubmit }: Props) => {
  const [name, setName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [ssn, setSsn] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState<Gender>(Gender.Other);

  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      name,
      occupation,
      ssn,
      dateOfBirth,
      gender,
    });
  };

  return (
    <form onSubmit={addPatient} className="flex flex-col gap-4">
      <div className="grid gap-1.5">
        <Label htmlFor="patient-name">Name</Label>
        <Input
          id="patient-name"
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="patient-ssn">Social security number</Label>
        <Input
          id="patient-ssn"
          value={ssn}
          onChange={({ target }) => setSsn(target.value)}
        />
      </div>
      <DatePickerField
        id="patient-dob"
        label="Date of birth"
        value={dateOfBirth}
        onChange={setDateOfBirth}
      />
      <div className="grid gap-1.5">
        <Label htmlFor="patient-occupation">Occupation</Label>
        <Input
          id="patient-occupation"
          value={occupation}
          onChange={({ target }) => setOccupation(target.value)}
        />
      </div>

      <div className="grid gap-1.5">
        <Label>Gender</Label>
        <Select
          value={gender}
          onValueChange={(value) => setGender(value as Gender)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            {genderOptions.map((option) => (
              <SelectItem key={option.label} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-2 flex items-center justify-end gap-2 border-t pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          <X />
          Cancel
        </Button>
        <Button type="submit">
          <Plus />
          Add
        </Button>
      </div>
    </form>
  );
};

export default AddPatientForm;
