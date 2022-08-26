import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../database/database";
export type FoodAttributes = {
  id: number;
  name: string;
  description: string;
  urlImagen: string;
  idRestaurant: number;
};

// we're telling the Model that 'id' is optional
// when creating an instance of the model (such as using Model.create()).
type UserCreationAttributes = Optional<FoodAttributes, "id">;

class Food extends Model<FoodAttributes, UserCreationAttributes> {
  declare id: number;
  declare name: string;
  declare description: string;
  declare urlImagen: string;
  declare idRestaurant: number;
}

Food.init(
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
    description: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    urlImagen: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    idRestaurant: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
  },
  {
    timestamps: false,
    tableName: "food",
    sequelize, // passing the `sequelize` instance is required
  }
);

export default Food;
