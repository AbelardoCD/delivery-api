import express from "express";
import { Authetication } from "./../controllers/AuthController";
const router = express.Router();

router.post("/auth", Authetication);

export default router;
