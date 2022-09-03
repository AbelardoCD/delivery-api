import { Request, Response } from "express";

import multer from "multer";
import Food from "../models/FoodModel";
import { validateError } from "../utils";
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

export const setFood = (req: Request, res: Response) => {
  console.log(req.file?.path);

  let food = new Food();
  food.setName(req.body.name);
  food.setDescription(req.body.description);
  if (req.file !== undefined) {
    food.setUrlImage(req.file?.path);
  } else {
    food.setUrlImage("uploads/error-uploading-image.png");
  }
  food.setPrice(req.body.price);
  food.setIdRestaurante(1);

  saveFood(food, res);
};

const saveFood = async (food: Food, res: Response) => {
  const { name, description, urlImagen, idRestaurant, price } = food;
  try {
    await Food.create({
      name,
      description,
      urlImagen,
      idRestaurant,
      price,
    });

    res.status(200).json({ message: "User successfuly created" });
  } catch (error) {
    res.status(400).json({ message: validateError(error) });
  }
};
