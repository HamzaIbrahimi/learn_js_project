const capitalize = (word) => {
  return word.at(0).toUpperCase() + word.slice(1);
};

const calculateCalories = (carbs, protien, fat) => {
  const carbsProteinCaloriesPerGram = 4;
  const fatCaloriesPerGram = 9;

  return (
    carbs * carbsProteinCaloriesPerGram +
    protien * carbsProteinCaloriesPerGram +
    fat * fatCaloriesPerGram
  );
};
export { capitalize, calculateCalories };
