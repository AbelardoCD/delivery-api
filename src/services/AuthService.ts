import { Request, Response } from "express";
import Users from "../models/UsersModel";
import { validateError } from "../utils";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const Authetication = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user: Users | null = await Users.findOne({
      where: { email: email },
    });
    console.log(user);

    //console.log(user);

    if (user === null) {
      throw new Error("User not found");
    }

    if (!validatePassword(user, password)) {
      return res.status(400).json("password o contraseña incorrecta");
    }
    return jwt.sign(
      { user },
      "secretKey",
      { expiresIn: "1h" },
      (_err, token) => {
        res.send({
          token,
        });
      }
    );
  } catch (error) {
    return res.status(400).json({ message: validateError(error) });
  }
};

function validatePassword(user: Users, password: string) {
  return bcrypt.compareSync(password, user.password);
}
