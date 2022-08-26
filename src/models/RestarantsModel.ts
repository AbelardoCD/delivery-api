import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../database/database";
import Food from "./FoodModel";
export type RestaurantsAttributes = {
  id: number;
  name: string;
  location: string;
  openHour: string;
  closeHour: string;
  phone: string;
  idUser: number;
};

// we're telling the Model that 'id' is optional
// when creating an instance of the model (such as using Model.create()).
type UserCreationAttributes = Optional<RestaurantsAttributes, "id">;

class Restaurants extends Model<RestaurantsAttributes, UserCreationAttributes> {
  declare id: number;
  declare name: string;
  declare location: string;
  declare openHour: string;
  declare closeHour: string;
  declare phone: string;
  declare idUser: number;
}

Restaurants.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    location: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    closeHour: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    openHour: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    idUser: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    phone: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "restaurants",
    sequelize, // passing the `sequelize` instance is required
  }
);

Restaurants.hasMany(Food, { foreignKey: "idRestaurant", sourceKey: "id" });
Food.belongsTo(Restaurants, { foreignKey: "idRestaurant", targetKey: "id" });
export default Restaurants;
