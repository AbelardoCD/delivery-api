import express from "express";
import {
  getUsers,
  setUsers,
  removeUser,
  updateUser,
  getRestaurants,
  setRestaurant,
  getRestaurant,
  getFood,
  getFoods,
} from "../controllers/AdminController";
import * as AuthtenticationToken from "../AuthenticationJsonWebToken";
import { upload } from "../services/UploadFile";
import { setFood } from "../services/AdminService";
const router = express.Router();

router.get("/users", AuthtenticationToken.verifyToken, getUsers);
router.post("/users", setUsers);
router.delete("/users/:id", removeUser);
router.put("/users/:id", updateUser);

router.get("/restaurants", getRestaurants);
router.get("/restaurants/:id", getRestaurant);
router.post("/restaurants", upload, setRestaurant);

router.post("/food", upload, setFood);
router.get("/food/:id", getFood);
router.get("/food", getFoods);
export default router;
