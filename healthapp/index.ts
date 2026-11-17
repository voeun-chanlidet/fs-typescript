import express from "express";
import { calculateBmi } from "./bmiCalculator.ts";
import { isNotNumber } from "./utils.ts";
import { calculateExercises } from "./exerciseCalculator.ts";
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (height <= 0 || weight <= 0) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  if (isNotNumber(req.query.height) || isNotNumber(req.query.weight)) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  res.json({
    height,
    weight,
    bmi: calculateBmi(height, weight),
  });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (daily_exercises === undefined || target === undefined) {
    res.status(400).json({ error: "parameters missing" });
    return;
  }

  if (!Array.isArray(daily_exercises) || daily_exercises.length === 0) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  if (isNotNumber(target) || daily_exercises.some(isNotNumber)) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }

  const hours = daily_exercises.map(Number);
  const targetNumber = Number(target);

  if (targetNumber <= 0 || hours.some((h) => h < 0)) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }
  const result = calculateExercises(hours, targetNumber);
  res.json(result);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
