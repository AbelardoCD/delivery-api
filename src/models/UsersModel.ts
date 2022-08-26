import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../database/database";
import Restaurants from "./RestarantsModel";
type UserAttributes = {
  id: number;
  name: string;
  lastName: string;
  role: string;
  password: string;
  createdAt: string;
  email: string;
};

// we're telling the Model that 'id' is optional
// when creating an instance of the model (such as using Model.create()).
type UserCreationAttributes = Optional<UserAttributes, "id">;

class Users extends Model<UserAttributes, UserCreationAttributes> {
  declare id: number;
  declare name: string;
  declare lastName: string;
  declare role: string;
  declare password: string;
  declare createdAt: string;
  declare email: string;

  public get getName(): string {
    return this.name;
  }
  public get getLastName(): string {
    return this.lastName;
  }
  public get getRole(): string {
    return this.role;
  }

  public get getPassword(): string {
    return this.getPassword;
  }
  public get getCreatedAt(): string {
    return this.createdAt;
  }

  public get getEmail(): string {
    return this.email;
  }

  public setName(name: string) {
    this.name = name;
  }

  public setLastName(lastName: string) {
    this.lastName = lastName;
  }
  public setRole(role: string) {
    this.role = role;
  }

  public setPassword(password: string) {
    this.password = password;
  }
  public setCreatedAt(createdAt: string) {
    this.createdAt = createdAt;
  }

  public setEmail(email: string) {
    this.createdAt = email;
  }
}

Users.init(
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
    lastName: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    role: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    createdAt: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "users",
    sequelize, // passing the `sequelize` instance is required
  }
);

Users.hasOne(Restaurants, { foreignKey: "idUser", sourceKey: "id" });
Restaurants.belongsTo(Users, { foreignKey: "idUser", targetKey: "id" });

export default Users;
