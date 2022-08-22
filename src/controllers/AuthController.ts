import * as Auth from "./../services/AuthService";
import { Request, Response } from "express";
export const Authetication = (req: Request, res: Response) => {
  Auth.Authetication(req, res);
};
