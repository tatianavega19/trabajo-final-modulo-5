import { UserController } from "../controller/userController";
import { Router } from "express";
import {validatorAuth} from "../middleware/validator"

const userRouter = Router();

userRouter.get("/", validatorAuth,UserController.getAllUsers);
userRouter.get("/:id",validatorAuth, UserController.readUserById)
userRouter.post("/register", UserController.registerUser);
userRouter.post("/login", UserController.loginUser)
userRouter.patch("/:username", validatorAuth, UserController.updateUser);
userRouter.delete("/logout", validatorAuth, UserController.logout)
userRouter.delete("/:username", validatorAuth, UserController.deleteUser);

export { userRouter }