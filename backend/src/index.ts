import express from "express";
import cors from "cors";
import diagnoses from "./routes/diagnoses";
import patients from "./routes/patients";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/ping", (_req, res) => {
  res.json("pong");
});

app.use("/api/diagnoses", diagnoses);
app.use("/api/patients", patients);

app.use("/api", (_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use(
  (
    error: unknown,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  },
);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("server is running on port:", PORT);
});
