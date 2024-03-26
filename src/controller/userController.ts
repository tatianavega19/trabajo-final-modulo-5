import { Request, Response } from "express";
import { UserModel } from "../model/usersModel";
import { validateUserRegistration, validatePartialUser } from "../validation/validationSchema"

abstract class UserController {
    
    static getAllUsers = (req: Request, res: Response) => {
        const users = UserModel.getAllUsers();
        res.json(users);
    }

    static registerUser = (req: Request, res: Response) => {
        const { username, password, email, phoneNumber } = req.body;

        const validationResult = validateUserRegistration(req.body);
        if (!validationResult.success) {
            return res.status(400).json({ error: "Validation error" });
        }

        if (!username || !password || !email || !phoneNumber) {
            return res.status(400).json({ error: "All fields are required: username, password, email, phoneNumber" });
        }

        const existingUser = UserModel.getAllUsers().find((user: any) => user.username === username || user.email === email);
        if (existingUser) {
            return res.status(409).json({ error: "User already exists" });
        }

        const result = UserModel.registerUser({ username, password, email, phoneNumber });

        if (result === 201) {
            res.status(201).json({ username, email });
        } else {
            console.error("Error registering user");
            res.status(500).json({ error: "Error registering user" });
        };
    };

    static loginUser = async (req: Request, res: Response) => {
        const validate = validatePartialUser(req.body);

        if (!validate.success)
            return res
                .status(400)
                .json({ error: "Ursename or  password incorrect" });

        const userLogged = await UserModel.loginUser(req.body);

        if (userLogged === 400)
            return res.status(400).json({ error: "Bad request" });

        if (userLogged === 404)
            return res.status(400).json({ error: "Not found user" });

        res
            .status(201)
            .json({ message: "User logged successfully", token: userLogged })
            .end();
    };

};

export { UserController }