import patients from "../../data/patients";
import {
  EntryWithoutId,
  NewPatientEntry,
  NonSensitivePatient,
  Patient,
} from "../types";
import { v4 as uuid } from "uuid";

const getNonSensitivePatient = (): NonSensitivePatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => {
      return { id, name, dateOfBirth, gender, occupation, entries };
    },
  );
};

const addPatient = (object: NewPatientEntry): Patient => {
  const newPatient = { id: uuid(), ...object, entries: [] };
  patients.push(newPatient);
  return newPatient;
};

const addEntry = (id: string, object: EntryWithoutId) => {
  const findPatient = patients.find((p) => p.id === id);
  if (!findPatient) {
    return undefined;
  }
  const newEntry = { id: uuid(), ...object };
  findPatient.entries.push(newEntry);
  return newEntry;
};

const findById = (id: string) => {
  const patientExist = patients.find((p) => p.id === id);
  return patientExist;
};

export default {
  getNonSensitivePatient,
  addPatient,
  findById,
  addEntry,
};
