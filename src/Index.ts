//import adminRoutes from "./routes/adminRoutes";
import app from "./app";
import { sequelize } from "./database/database";

// se importan los modelos para que se creen las tablas
//import "./models/UsersModel";

const PORT = 3000;

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
