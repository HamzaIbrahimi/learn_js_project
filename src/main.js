import FetchWrapper from "./fetch-wrapper.js";
import { baseAPI } from "./API.js";
import { displayEntry } from "./helpers.js";
import "./styles.css";
import snackbar from "snackbar";

const fetchWrapper = new FetchWrapper(baseAPI);
const formSubmit = document.querySelector("#create-form");
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
  });
};

init();
