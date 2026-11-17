import { isNotNumber } from "./utils.ts";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface InputValues {
  target: number;
  trainingHours: number[];
}

const parseArguments = (args: string[]): InputValues => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const values = args.slice(2);
  if (values.some(isNotNumber)) {
    throw new Error("The values provided were not numbers!");
  }

  const numbers = values.map(Number);

  const target = numbers[0];
  const trainingHours = numbers.slice(1);

  if (target <= 0) {
    throw new Error("Target must be greater than 0");
  }

  if (trainingHours.some((h) => h < 0)) {
    throw new Error("Training Hours can't be lower than 0");
  }

  return { target, trainingHours };
};

export const calculateExercises = (
  trainingHours: number[],
  target: number,
): Result => {
  const periodLength = trainingHours.length;

  const trainingDays = trainingHours.filter((hour) => hour > 0).length;

  const totalHours = trainingHours.reduce((sum, hour) => sum + hour, 0);
  const average = totalHours / periodLength;

  const success = average >= target;

  const ratioForRating = average / target;

  let rating: number;
  let ratingDescription: string;

  if (ratioForRating >= 1) {
    rating = 3;
    ratingDescription = "you reached the target, you did good!";
  } else if (ratioForRating >= 0.6) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "come on you gotta push more!";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { target, trainingHours } = parseArguments(process.argv);
    console.log(calculateExercises(trainingHours, target));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
