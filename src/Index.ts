import app from "./app";
import { sequelize } from "./database/database";

const PORT = 3001;

async function mainFuncion() {
  try {
    await sequelize.sync({ force: false });
    console.log("Conectado");
    app.listen(PORT);
  } catch (error) {
    console.log("error", error);
  }
}

mainFuncion();
