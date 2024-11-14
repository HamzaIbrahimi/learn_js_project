const capitalize = (word) => {
  return word.at(0).toUpperCase() + word.slice(1);
};

const calculateCalories = (carbs, protein, fat) => {
  const carbsProteinCaloriesPerGram = 4;
  const fatCaloriesPerGram = 9;

  return (
    carbs * carbsProteinCaloriesPerGram +
    protein * carbsProteinCaloriesPerGram +
    fat * fatCaloriesPerGram
  );
};

const displayEntry = (name, carbs, protein, fat) => {
  const foodList = document.querySelector("#food-list");
  foodList.insertAdjacentHTML(
    "beforeend",
    `<li class="card">
        <div>
          <h3 class="name">${capitalize(name)}</h3>
          <div class="calories">${calculateCalories(
            carbs,
            protein,
            fat
          )} calories</div>
          <ul class="macros">
            <li class="carbs"><div>Carbs</div><div class="value">${carbs}g</div></li>
            <li class="protein"><div>Protein</div><div class="value">${protein}g</div></li>
            <li class="fat"><div>Fat</div><div class="value">${fat}g</div></li>
          </ul>
        </div>
      </li>`
  );
};
export { displayEntry };
