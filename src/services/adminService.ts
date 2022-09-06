import { Request, Response } from "express";
import Users from "../models/UsersModel";
import { validateError, encodeToBase64 } from "../utils";
import bcrypt from "bcryptjs";
import Restaurants from "../models/RestarantsModel";
import Food from "../models/FoodModel";
import {
  foodObjectInterface,
  RestaurantsObjectInterface,
} from "../interfaces/foodObjectInterface";

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

    let arrayRestaurantsArray: RestaurantsObjectInterface[] = [];
    if (allRestaurants.length > 0) {
      for (let i = 0; i < allRestaurants.length; i++) {
        await encodeToBase64(allRestaurants[i].urlImage).then((resp: any) => {
          arrayRestaurantsArray.push({
            food: allRestaurants[i],
            imageBase64: {
              base: resp,
              name: allRestaurants[i].urlImage.split("\\")[1],
            },
          });
        });
      }
    }
    res.json(arrayRestaurantsArray).status(200);
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

    let arrayRestaurants: RestaurantsObjectInterface[] = [];
    if (allRestaurant.length > 0) {
      for (let i = 0; i < allRestaurant.length; i++) {
        await encodeToBase64(allRestaurant[i].urlImage).then((resp: any) => {
          arrayRestaurants.push({
            food: allRestaurant[i],
            imageBase64: {
              base: resp,
              name: allRestaurant[i].urlImage.split("\\")[1],
            },
          });
        });
      }
    }
    res.json(arrayRestaurants).status(200);
  } catch (err) {
    res.status(400).json({ message: validateError(err) });
  }
};

export const setRestaurant = async (req: Request, res: Response) => {
  let restaurant = new Restaurants();
  restaurant.setName(req.body.name);
  restaurant.setLocation(req.body.location);
  restaurant.setopenHour(req.body.openHour);
  restaurant.setCloseHour(req.body.closeHour);
  restaurant.setPhone(req.body.phone);
  restaurant.setIdUser(req.body.idUser);

  if (req.file !== undefined) {
    restaurant.setUrlImage(req.file?.path);
  } else {
    restaurant.setUrlImage("uploads/error-uploading-image.png");
  }

  saveRestaurant(restaurant, res);
};

const saveRestaurant = async (restaurant: Restaurants, res: Response) => {
  try {
    const { closeHour, location, name, openHour, phone, idUser, urlImage } =
      restaurant;

    await Restaurants.create({
      closeHour,
      location,
      name,
      openHour,
      phone,
      idUser,
      urlImage,
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

export const setFood = (req: Request, res: Response) => {
  let food = new Food();
  food.setName(req.body.name);
  food.setDescription(req.body.description);

  if (req.file !== undefined) {
    food.setUrlImage(req.file?.path);
  } else {
    food.setUrlImage("uploads/error-uploading-image.png");
  }
  food.setPrice(req.body.price);
  food.setIdRestaurante(req.body.idRestaurant);

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
