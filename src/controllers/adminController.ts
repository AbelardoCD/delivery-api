import { Request, Response } from "express";

import * as AdminService from "./../services/adminService";
export const getUsers = async (req: Request, res: Response) => {
  AdminService.getAllUser(req, res);
};

export const setUsers = async (req: Request, res: Response) => {
  AdminService.setUser(req, res);
};

export const removeUser = async (req: Request, res: Response) => {
  AdminService.removeUser(req, res);
};

export const updateUser = async (req: Request, res: Response) => {
  AdminService.updateUser(req, res);
};
