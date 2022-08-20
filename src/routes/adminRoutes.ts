import express from "express";
import {
  getUsers,
  setUsers,
  removeUser,
  updateUser,
} from "../controllers/adminController";
const router = express.Router();

router.get("/users", getUsers);
router.post("/users", setUsers);
router.delete("/users/:id", removeUser);
router.put("/users/:id", updateUser);

export default router;
