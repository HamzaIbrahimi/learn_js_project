export default class AppData {
  constructor() {
    this.food = [];
  }

  addFood = (carbs, protein, fat) => {
    this.food.push({ carbs: +carbs, protein: +protein, fat: +fat });
  };

  getTotalCarbs = () =>
    this.food
      .map((foodItem) => foodItem.carbs)
      .reduce((current, total) => current + total, 0);

  getTotalProtein = () =>
    this.food
      .map((foodItem) => foodItem.protein)
      .reduce((current, total) => current + total, 0);

  getTotalFat = () =>
    this.food
      .map((foodItem) => foodItem.fat)
      .reduce((current, total) => current + total, 0);
}
