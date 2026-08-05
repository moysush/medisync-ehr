import { Gender, HealthCheckRating } from "./types";
import z from "zod";

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
});

export const toNewPatient = (object: unknown) => {
  return NewPatientSchema.parse(object);
};

// Entry Schemas
const BaseEntrySchema = z.object({
  description: z.string(),
  date: z.iso.date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const HealthCheckSchema = BaseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.enum(HealthCheckRating),
});

const HospitalSchema = BaseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.iso.date(),
    criteria: z.string(),
  }),
});

const OccupationalHealthcareSchema = BaseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.iso.date(),
      endDate: z.iso.date(),
    })
    .optional(),
});

const NewEntrySchema = z.discriminatedUnion("type", [
  HealthCheckSchema,
  HospitalSchema,
  OccupationalHealthcareSchema,
]);

export const toNewEntry = (object: unknown) => {
  return NewEntrySchema.parse(object);
};
