import FetchWrapper from "./fetch-wrapper.js";
import { baseAPI } from "./API.js";
import { capitalize, calculateCalories } from "./helpers.js";
import "./styles.css";
import snackbar from "snackbar";

const formSubmit = document.querySelector("#create-form");
formSubmit.addEventListener("submit", (e) => {
  e.preventDefault();
  const selected = document.querySelector("#create-name");
  const carbs = document.querySelector("#create-carbs");
  const protein = document.querySelector("#create-protein");
  const fat = document.querySelector("#create-fat");
  const fetchWrapper = new FetchWrapper(baseAPI);
  if (selected.value.length != 0) {
    fetchWrapper
      .post("/", {
        fields: {
          name: { stringValue: selected.value },
          carbs: { integerValue: +carbs.value },
          protein: { integerValue: +protein.value },
          fat: { integerValue: +fat.value },
        },
      })
      .then((data) => {
        const foodList = document.querySelector("#food-list");
        foodList.insertAdjacentHTML(
          "beforeend",
          `<li class="card">
            <div>
              <h3 class="name">${capitalize(selected.value)}</h3>
              <div class="calories">${calculateCalories(
                carbs.value,
                protein.value,
                fat.value
              )} calories</div>
              <ul class="macros">
                <li class="carbs"><div>Carbs</div><div class="value">${
                  carbs.value
                }g</div></li>
                <li class="protein"><div>Protein</div><div class="value">${
                  protein.value
                }g</div></li>
                <li class="fat"><div>Fat</div><div class="value">${
                  fat.value
                }g</div></li>
              </ul>
            </div>
          </li>`
        );
        snackbar.show("Food added successfully");
        formSubmit.reset();
      })
      .catch((error) => {
        console.error(error);
        snackbar.show("Some data is missing");
        return;
      });
  }
});
