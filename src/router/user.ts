import { UserController } from "../controller/userController";
import { Router } from "express";

const userRouter = Router();

userRouter.get("/", UserController.getAllUsers);
userRouter.post("/register", UserController.registerUser);

export { userRouter }