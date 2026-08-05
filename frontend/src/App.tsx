import { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Users } from "lucide-react";

import { Toaster } from "@/components/ui/sonner";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { apiBaseUrl } from "./constants";
import { Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientDetails from "./components/PatientListPage/PatientDetails";
import ThemeToggle from "./components/ThemeToggle";
import Logo from "./components/Logo";

const AppShell = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") return;

    let active = true;
    patientService.getAll().then((patients) => {
      if (active) {
        setPatients(patients);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <NavLink to="/" className="flex items-center gap-2 font-semibold">
              <Logo className="size-7 shrink-0" />
              MediSync EHR
            </NavLink>
            <nav className="flex items-center gap-1">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    isActive && "bg-accent text-accent-foreground",
                  )
                }
              >
                <Users />
                Patients
              </NavLink>
            </nav>
          </div>
          <ThemeToggle />
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <Routes>
          <Route
            path="/"
            element={
              <PatientListPage
                patients={patients}
                setPatients={setPatients}
                loading={loading}
              />
            }
          />
          <Route path="/patients/:id" element={<PatientDetails />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => (
  <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <AppShell />
    <Toaster richColors position="bottom-right" />
  </Router>
);

export default App;
