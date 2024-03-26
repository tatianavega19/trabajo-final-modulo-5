import { UserController } from "../controller/userController";
import { Router } from "express";

const userRouter = Router();

userRouter.get("/", UserController.getAllUsers);
userRouter.get("/:id", UserController.readUserById)
userRouter.post("/register", UserController.registerUser);
userRouter.post("/login", UserController.loginUser)

export { userRouter }