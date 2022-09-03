import Food from "../models/FoodModel";

export interface foodObjectInterface {
  food: Food;
  imageBase64: { base: string; name: string };
}
