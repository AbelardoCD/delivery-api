import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../database/database";
export type FoodAttributes = {
  id: number;
  name: string;
  description: string;
  urlImagen: string;
  price: number;
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
  declare price: number;

  get getName(): string {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
  }

  public setDescription(description: string) {
    this.description = description;
  }

  public setUrlImage(urlImage: string) {
    this.urlImagen = urlImage;
  }
  public setIdRestaurante(id: number) {
    this.idRestaurant = id;
  }
  public setPrice(price: number) {
    this.price = price;
  }
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
    price: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
    tableName: "food",
    sequelize,
  }
);

export default Food;
