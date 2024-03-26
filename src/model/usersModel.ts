import jsonfile from "jsonfile";
import crypto from "node:crypto";
import users from "../database/users.json"
import { writeFile } from "jsonfile"
import { dirname } from "../database/dirname"

class UserModel {

    static findUser(username: string) {
        return users.users.find(
            (user) => user.username.toLowerCase() === username.toLowerCase()
        );
    };

    static writeDbUser() {
        return writeFile(dirname + "/users.json", users);
    };

    static getAllUsers() {
        const usersData = jsonfile.readFileSync("./src/database/users.json");
        return usersData.users.map((user: any) => ({
            id: user.id,
            username: user.username,
            email: user.email,
        }));
    };

    static registerUser(userData: any) {
        try {
            const usersData = jsonfile.readFileSync("./src/database/users.json");
            const { username, password, email, phoneNumber } = userData;

            const existingUser = usersData.users.find((user: any) => user.username === username || user.email === email);
            if (existingUser) {
                return 409;
            };

            const hashedPassword = crypto.createHash("sha256").update(password).digest("hex")

            const id = crypto.randomUUID();

            const newUser = { id, username, password: hashedPassword, email, phoneNumber, token: "" }

            usersData.users.push(newUser)

            jsonfile.writeFileSync("./src/database/users.json", usersData)

            return 201;
        } catch (error) {
            console.error("Error registering user:", error)
            return 500;
        };
    };

    static loginUser(userData: any) {
        const { username, password } = userData;

        const userFound = this.findUser(username);

        if (!userFound) return 404;

        const hashPassword = crypto
            .createHash("sha256")
            .update(password)
            .digest("hex");

        if (userFound.password !== hashPassword) return 400;

        const token = crypto.randomUUID();

        userFound.token = token;
        this.writeDbUser();

        return token;
    };

    static readUserById(userId: string) {
        const user = users.users.find((user: any) => user.id === userId);

        if (!user) {
            return { error: "User not found!" };
        }

        const { id, username, email } = user;

        return { id, username, email };
    }
};

export { UserModel }