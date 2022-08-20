import { Request, Response } from "express";

import { Users } from "../models/UsersModel";
import validateError from "./../utils";

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const allUsers = await Users.findAll();

    res.json(allUsers).status(200);
  } catch (err) {
    res.status(400).json({ message: validateError(err) });
  }
};

export const setUsers = async (req: Request, res: Response) => {
  try {
    const { name, lastName, userRole } = req.body;

    await Users.create({
      name,
      lastName,
      userRole,
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
