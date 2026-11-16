import { isNotNumber } from "./utils.ts";

interface BmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (isNotNumber(args[2]) || isNotNumber(args[3])) {
    throw new Error("The values provided were not numbers!");
  }

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (height <= 0 || weight <= 0) {
    throw new Error("Height and Weight must be greater than 0");
  }

  return { height, weight };
};

export const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  if (bmi < 16.0) {
    return "Underweight (Severe thinness)";
  } else if (bmi < 17.0) {
    return "Underweight (Moderate thinness)";
  } else if (bmi < 18.5) {
    return "Underweight (Mild thinness)";
  } else if (bmi < 25.0) {
    return "Normal range";
  } else if (bmi < 30.0) {
    return "Overweight (Pre-obese)";
  } else if (bmi < 35.0) {
    return "Obese (Class I)";
  } else if (bmi < 40.0) {
    return "Obese (Class II)";
  } else {
    return "Obese (Class III)";
  }
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
