import Food from "../models/FoodModel";
import Restaurants from "../models/RestarantsModel";

export interface foodObjectInterface {
  food: Food;
  imageBase64: { base: string; name: string };
}

export interface RestaurantsObjectInterface {
  food: Restaurants;
  imageBase64: { base: string; name: string };
}
