import { Request, Response } from "express";
import { UserModel } from "../model/usersModel";
import crypto from "node:crypto";
import { validateUserRegistration, validatePartialUser } from "../validation/validationSchema";

abstract class UserController {

    static getAllUsers = (req: Request, res: Response) => {
        const users = UserModel.getAllUsers();
        res.json(users);
    }

    static registerUser = (req: Request, res: Response) => {
        const { username, password, email, phoneNumber } = req.body;

        const validationResult = validateUserRegistration(req.body);
        if (!validationResult.success) return res.status(400).json({ error: "Validation error" });

        if (!username || !password || !email || !phoneNumber) return res.status(400).json({ error: "All fields are required: username, password, email, phoneNumber" });


        const existingUser = UserModel.getAllUsers().find((user: any) => user.username === username || user.email === email);
        if (existingUser) return res.status(409).json({ error: "User already exists" });

        const result = UserModel.registerUser({ username, password, email, phoneNumber });

        if (result.error) return res.status(404).json(result)

        res.status(201).json({ username, email })
    };

    static loginUser = (req: Request, res: Response) => {
        const validate = validatePartialUser(req.body);

        if (!validate.success)
            return res
                .status(400)
                .json({ error: "Ursename or password incorrect" });

        const response = UserModel.loginUser(req.body);

        if (response.error) return res.status(400).json(response);

        res
            .status(201)
            .json({ message: "User logged successfully", token: response.message })
            .end();
    };

    static readUserById = (req: Request, res: Response) => {
        const userId = req.params.id;

        const response = UserModel.readUserById(userId);
        if (response.error) return res.status(404).json(response)
        res.json(response.message)
        return res.status(500).json({ error: "Server error" });
    };

    static logout = (req: Request, res: Response) => {
        const { username } = req.body;
        const response = UserModel.logout(username);

        if (response.error) return res.status(404).json(response)

        res.json(response)
    };

    static updateUser = (req: Request, res: Response) => {
        const validate = validatePartialUser(req.body);

        if (!validate.success) return res.status(400).json({ error: validate.error });

        const usernameParam = req.params.username;

        if (req.body.password)
            req.body.password = crypto
                .createHash("sha256")
                .update(req.body.password)
                .digest("hex");

        const userData = { usernameParam, ...req.body };

        const response = UserModel.updateUser(userData);

        if (response.error) return res.status(400).json(response);

        res.status(201).json(response);
    };

    static deleteUser = (req: Request, res: Response) => {
        const { username } = req.params;
        const response = UserModel.deleteUser(username);

        if (response.error) return res.status(404).json(response);

        return res.json(response);
    }
};

export { UserController }