import jsonfile from "jsonfile";
import crypto from "node:crypto";
import { randomUUID } from "node:crypto"

class UserModel {
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
            }

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
};

export { UserModel }