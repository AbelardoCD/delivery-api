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
  urlImage: string;
};

type UserCreationAttributes = Optional<RestaurantsAttributes, "id">;

class Restaurants extends Model<RestaurantsAttributes, UserCreationAttributes> {
  declare id: number;
  declare name: string;
  declare location: string;
  declare openHour: string;
  declare closeHour: string;
  declare phone: string;
  declare idUser: number;
  declare urlImage: string;

  public setName(name: string) {
    this.name = name;
  }

  public setLocation(location: string) {
    this.location = location;
  }

  public setopenHour(openHour: string) {
    this.openHour = openHour;
  }
  public setCloseHour(closeHour: string) {
    this.closeHour = closeHour;
  }
  public setPhone(phone: string) {
    this.phone = phone;
  }

  public setIdUser(idUser: number) {
    this.idUser = idUser;
  }
  public setUrlImage(urlImage: string) {
    this.urlImage = urlImage;
  }
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
    urlImage: {
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
