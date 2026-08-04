import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { Button as UiButton } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { apiBaseUrl } from "./constants";
import { Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientDetails from "./components/PatientListPage/PatientDetails";
import { Notification } from "./components/Notification";
import { useNotification } from "./utility/useNotification";
import { Home } from "@mui/icons-material";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [message, notify] = useNotification();
  const [shadcnValue, setShadcnValue] = useState("");
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button
            component={Link}
            to="/"
            variant="contained"
            color="primary"
            startIcon={<Home />}
          >
            Home
          </Button>
          <Notification message={message} />
          <Divider hidden />
          <div className="my-6 flex w-full max-w-sm flex-col gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Shadcn check
                  <Badge variant="secondary">working</Badge>
                </CardTitle>
                <CardDescription>
                  Rendered via @/components/ui imports.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <div className="grid gap-1.5">
                  <Label htmlFor="demo">Demo input</Label>
                  <Input
                    id="demo"
                    value={shadcnValue}
                    onChange={(e) => setShadcnValue(e.target.value)}
                    placeholder="Type something..."
                  />
                </div>
                <UiButton onClick={() => setClickCount((c) => c + 1)}>
                  Clicked {clickCount} times
                </UiButton>
              </CardContent>
            </Card>
          </div>
          <Routes>
            <Route
              path="/"
              element={
                <PatientListPage
                  patients={patients}
                  setPatients={setPatients}
                />
              }
            />
            <Route
              path="/patients/:id"
              element={<PatientDetails notify={notify} />}
            />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
