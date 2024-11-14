import FetchWrapper from "./fetch-wrapper.js";
import { baseAPI } from "./API.js";
import { capitalize, calculateCalories } from "./helpers.js";
import "./styles.css";
import AppData from "./app-data.js";
import snackbar from "snackbar";
import Chart from "chart.js/auto";

const appData = new AppData();
const fetchWrapper = new FetchWrapper(baseAPI);
const formSubmit = document.querySelector("#create-form");
const foodList = document.querySelector("#food-list");
let chartInstance = null;

const displayEntry = (name, carbs, protein, fat) => {
  appData.addFood(carbs, protein, fat);
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

const renderChart = () => {
  chartInstance?.destroy();
  const ctx = document.getElementById("app-chart").getContext("2d");
  chartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Carbs", "Protein", "Fat"],
      datasets: [
        {
          label: "Data label",
          data: [
            appData.getTotalCarbs(),
            appData.getTotalProtein(),
            appData.getTotalFat(),
          ],
          backgroundColor: ["#25AEEE", "FECD52", "#57D269"],
        },
      ],
    },
  });
};

formSubmit.addEventListener("submit", (e) => {
  e.preventDefault();
  const selectedFoodItem = document.querySelector("#create-name");
  const carbs = document.querySelector("#create-carbs");
  const protein = document.querySelector("#create-protein");
  const fat = document.querySelector("#create-fat");
  if (selectedFoodItem.value.length != 0) {
    fetchWrapper
      .post("/", {
        fields: {
          name: { stringValue: selectedFoodItem.value },
          carbs: { integerValue: carbs.value },
          protein: { integerValue: protein.value },
          fat: { integerValue: fat.value },
        },
      })
      .then((data) => {
        displayEntry(
          selectedFoodItem.value,
          carbs.value,
          protein.value,
          fat.value
        );
        snackbar.show("Food added successfully");
        renderChart();
        formSubmit.reset();
      })
      .catch((error) => {
        console.error(error);
        snackbar.show("Some data is missing");
        return;
      });
  }
});

const init = () => {
  fetchWrapper.get("/").then((data) => {
    data.documents?.forEach((document) => {
      const getField = document.fields;
      displayEntry(
        getField.name.stringValue,
        getField.carbs.integerValue,
        getField.protein.integerValue,
        getField.fat.integerValue
      );
    });
    renderChart();
  });
};

init();
