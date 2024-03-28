import { UserController } from "../controller/userController";
import { Router } from "express";
import {validatorAuth} from "../middleware/validator"

const userRouter = Router();

userRouter.get("/", validatorAuth,UserController.getAllUsers);
userRouter.get("/:id", UserController.readUserById)
userRouter.post("/register", UserController.registerUser);
userRouter.post("/login", UserController.loginUser)
userRouter.delete("/logout", validatorAuth, UserController.logout)

export { userRouter }