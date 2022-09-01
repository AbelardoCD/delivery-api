import express from "express";
import adminRoutes from "./routes/AdminRoutes";
import AuthRoutes from "./routes/AuthRoutes";
const app = express();
import cors from "cors";
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use("/api/admin", adminRoutes);
app.use("/api", AuthRoutes);

export default app;
