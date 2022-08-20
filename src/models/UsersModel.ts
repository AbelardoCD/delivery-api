import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";

export const Users = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    userRole: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

/*Users.hasMany(Tienda,{
   //id con la cual se hara la forekey en la otra tabla  tienda
   foreignKey:"userId",
   //id de la tabla users
   sourceKey:'id'
 })

 Tienda.belonsTo(Users,{
    foreignKey:"userId",
    target:'id'
 })*/
