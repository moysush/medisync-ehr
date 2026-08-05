import express from "express";
import patientsService from "../services/patientsService";
import z from "zod";
import { toNewEntry, toNewPatient } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getNonSensitivePatient());
});

router.get("/:id", (req, res) => {
  const patient = patientsService.findById(req.params.id);
  if (!patient) {
    res.status(404).json({ error: "Patient not found" });
    return;
  }
  res.send(patient);
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatient(req.body);
    const addedPatient = patientsService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (error) {
    res.status(400).json({
      error: error instanceof z.ZodError ? error.issues : "Unknown error",
    });
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const validEntry = toNewEntry(req.body);
    const addedEntry = patientsService.addEntry(req.params.id, validEntry);
    if (!addedEntry) {
      res.status(404).json({ error: "Patient not found" });
      return;
    }
    res.json(addedEntry);
  } catch (error) {
    res.status(400).json({
      error: error instanceof z.ZodError ? error.issues : "Unknown error",
    });
  }
});

export default router;
