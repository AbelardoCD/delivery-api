import express from "express";
import adminRoutes from "./routes/AdminRoutes";
import AuthRoutes from "./routes/AuthRoutes";
const app = express();
app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api", AuthRoutes);

export default app;
