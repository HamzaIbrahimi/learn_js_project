class AppData {
  constructor() {
    this.foodValueArray = [];
  }

  addFood = (carbs, protein, fat) => {
    this.foodValueArray.push({ carbs, protein, fat });
  };

  getTotalCarbs = () =>
    this.foodValueArray
      .map((foodItem) => foodItem.carbs)
      .reduce((current, total) => current + total);

  getTotalProtein = () =>
    this.foodValueArray
      .map((foodItem) => foodItem.protein)
      .reduce((current, total) => current + total);

  getTotalFat = () =>
    this.foodValueArray
      .map((foodItem) => foodItem.fat)
      .reduce((current, total) => current + total);
}

const data = new AppData();
let a1 = 1;
let a2 = 3;
let a3 = 2;
for (let i = 0; i < 10; i++) {
  data.addFood(a1, a2, a3);
}
console.log(data.getTotalCarbs(), data.getTotalFat(), data.getTotalProtein());
