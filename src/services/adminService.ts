import { Request, Response } from "express";
import Users from "../models/UsersModel";
import validateError from "../utils";
import bcrypt from "bcryptjs";
import Restaurants, { RestaurantsAttributes } from "../models/RestarantsModel";
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
