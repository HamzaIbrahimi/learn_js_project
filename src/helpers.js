export const capitalize = (word) => {
  return word.at(0).toUpperCase() + word.slice(1);
};

export const calculateCalories = (carbs, protein, fat) => {
  const carbsProteinCaloriesPerGram = 4;
  const fatCaloriesPerGram = 9;

  return (
    carbs * carbsProteinCaloriesPerGram +
    protein * carbsProteinCaloriesPerGram +
    fat * fatCaloriesPerGram
  );
};
