interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
