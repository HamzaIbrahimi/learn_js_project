import FetchWrapper from "./fetch-wrapper.js";
import { baseAPI } from "./API.js";

const formSubmit = document.querySelector("#create-form");
formSubmit.addEventListener("submit", (e) => {
  e.preventDefault();
  const selected = document.querySelector("#create-name");
  const carbs = document.querySelector("#create-carbs");
  const protein = document.querySelector("#create-protein");
  const fat = document.querySelector("#create-fat");
  const fetchWrapper = new FetchWrapper(baseAPI);
  if (selected.value.length != 0) {
    try {
      fetchWrapper.post("unique_database", {
        fields: {
          name: { stringValue: selected.value },
          carbs: { integerValue: +carbs.value },
          protein: { integerValue: +protein.value },
          fat: { integerValue: +fat.value },
        },
      });
      formSubmit.reset();
    } catch (error) {
      console.error(error);
    }
  }
});
