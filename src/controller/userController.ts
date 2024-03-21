import { Request, Response } from "express";
import { UserModel } from "../model/usersModel";

abstract class UserController {
    static getAllUsers = (req: Request, res: Response) => {
        const users = UserModel.getAllUsers();
        res.json(users);
    };
};

export { UserController }