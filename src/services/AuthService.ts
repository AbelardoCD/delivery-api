import { Request, Response } from "express";
import { Users } from "../models/UsersModel";
import validateError from "../utils";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const Authetication = async (req: Request, res: Response) => {
  try {
    console.log(req.body.password);
    const { email, password } = req.body;
    const user = await Users.findOne({
      where: { email: email },
    });

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
          user,
        });
      }
    );
  } catch (error) {
    return res.status(400).json({ message: validateError(error) });
  }
};

function validatePassword(user: any, password: string) {
  return bcrypt.compareSync(password, user.password);
}
