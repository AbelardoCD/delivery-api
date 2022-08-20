import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "delivery-api",
  "postgres",
  "Qaz147wsx",
  {
    host: "localhost",
    dialect: "postgres",
  }
);
