//import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from "express";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    req.headers.token = bearerToken;
    next();
  } else {
    res.status(403).json({ message: "you do not have permission to enter" });
  }
};
