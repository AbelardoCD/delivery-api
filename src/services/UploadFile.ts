import { Request, Response } from "express";

import multer from "multer";
import Food from "../models/FoodModel";
import validateError from "../utils";
const customStorage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, "./uploads/");
  },

  filename: function (_req, file, cb) {
    cb(null, +Date.now() + "-" + file.originalname);
  },
});

const customUpload = multer({ storage: customStorage });

export const upload = customUpload.single("image");

export const uploadFile = (req: Request, res: Response) => {
  console.log("file");
  console.log(req.body.text);
  console.log(req.file?.originalname);

  let food = new Food();
  food.setName(req.body.name);
  food.setDescription(req.body.description);
  food.setUrlImage("./uploads/" + req.file?.originalname);
  food.setIdRestaurante(2);

  saveFood(food, res);
};

const saveFood = async (food: Food, res: Response) => {
  console.log(food);

  const { name, description, urlImagen, idRestaurant } = food;
  try {
    await Food.create({
      name,
      description,
      urlImagen,
      idRestaurant,
    });

    res.status(200).json({ message: "User successfuly created" });
  } catch (error) {
    res.status(400).json({ message: validateError(error) });
  }
};
