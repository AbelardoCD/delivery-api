import { Request, Response } from "express";
import Users from "../models/UsersModel";
import { validateError, encodeToBase64 } from "../utils";
import bcrypt from "bcryptjs";
import Restaurants, { RestaurantsAttributes } from "../models/RestarantsModel";
import Food from "../models/FoodModel";
import { foodObjectInterface } from "../interfaces/foodObjectInterface";

export const getAllUser = async (_req: Request, res: Response) => {
  try {
    const allUsers = await Users.findAll();

    res.json(allUsers).status(200);
  } catch (err) {
    res.status(400).json({ message: validateError(err) });
  }
};

export const setUser = async (req: Request, res: Response) => {
  console.log("set users");

  try {
    const { name, lastName, role, email, password, createdAt } = req.body;

    const bcryptPassword = bcrypt.hashSync(password, 10);

    await Users.create({
      name,
      lastName,
      email,
      role,
      password: bcryptPassword,
      createdAt,
    });

    res.status(200).json({ message: "User successfuly created" });
  } catch (error) {
    res.status(400).json({ message: validateError(error) });
  }
};

export const removeUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await Users.destroy({
      where: {
        id,
      },
    });

    res.status(200).json({ message: "User Succesffuly removed" });
  } catch (error) {
    res.status(400).json({ message: validateError(error) });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const result = await Users.findOne({ where: { id } });

    if (result === null) {
      throw new Error("User not found");
    }

    const update = await result?.update({
      name: name,
    });

    res
      .status(200)
      .json({ message: "User Succesffuly removed", record: update });
  } catch (error) {
    res.status(400).json({ message: validateError(error) });
  }
};

export const getAllRestaurants = async (_req: Request, res: Response) => {
  try {
    const allRestaurants: Restaurants[] = await Restaurants.findAll();
    res.json(allRestaurants).status(200);
  } catch (err) {
    res.status(400).json({ message: validateError(err) });
  }
};

export const getRestaurant = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const allRestaurant: Restaurants[] = await Restaurants.findAll({
      where: { idUser: id },
    });

    res.json(allRestaurant).status(200);
  } catch (err) {
    res.status(400).json({ message: validateError(err) });
  }
};

export const setRestaurant = async (req: Request, res: Response) => {
  try {
    const { closeHour, location, name, openHour, phone, idUser } =
      req.body as RestaurantsAttributes;

    await Restaurants.create({
      closeHour,
      location,
      name,
      openHour,
      phone,
      idUser,
    });

    res.status(200).json({ message: "Restaurant successfuly created" });
  } catch (error) {
    res.status(400).json({ message: validateError(error) });
  }
};

export const getFood = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const food: Food | null = await Food.findOne({
      where: { id: id },
    });

    if (food === null) {
      throw new Error("Food not found");
    }
    let foodObject: foodObjectInterface = {
      food: {} as Food,
      imageBase64: { base: "", name: "" },
    };

    await encodeToBase64(food!.urlImagen).then((resp: any) => {
      foodObject = {
        food: food,
        imageBase64: { base: resp, name: food.urlImagen.split("\\")[1] },
      };
    });

    res.status(200).json({ food: foodObject });
  } catch (err) {
    res.status(400).json({ message: validateError(err) });
  }
};

export const getFoods = async (_req: Request, res: Response) => {
  try {
    const foodAll: Food[] = await Food.findAll();

    let arrayFood: foodObjectInterface[] = [];

    if (foodAll.length > 0) {
      for (let i = 0; i < foodAll.length; i++) {
        await encodeToBase64(foodAll[i].urlImagen).then((resp: any) => {
          arrayFood.push({
            food: foodAll[i],
            imageBase64: {
              base: resp,
              name: foodAll[i].urlImagen.split("\\")[1],
            },
          });
        });
      }
    }

    res.status(200).json({ foodAll: arrayFood });
  } catch (err) {
    res.status(400).json({ message: validateError(err) });
  }
};
