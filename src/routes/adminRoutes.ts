import express from "express";
import {
  getUsers,
  setUsers,
  removeUser,
  updateUser,
  getRestaurants,
  setRestaurant,
  getRestaurant,
} from "../controllers/adminController";
import * as AuthtenticationToken from "../AuthenticationJsonWebToken";
const router = express.Router();

router.get("/users", AuthtenticationToken.verifyToken, getUsers);
router.post("/users", setUsers);
router.delete("/users/:id", removeUser);
router.put("/users/:id", updateUser);

router.get("/restaurants", getRestaurants);
router.get("/restaurants/:id", getRestaurant);
router.post("/restaurants", setRestaurant);
export default router;
