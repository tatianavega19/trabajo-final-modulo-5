import jsonfile from "jsonfile";
import crypto from "node:crypto";
import users from "../database/users.json";
import { writeFile } from "jsonfile";
import { dirname } from "../database/dirname";

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
        const usersData = jsonfile.readFileSync("./src/database/users.json");
        const { username, password, email, phoneNumber } = userData;

        const existingUser = usersData.users.find(
            (user: any) => user.username === username || user.email === email
        );

        if (existingUser) return { error: "Existing user" };

        const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

        const id = crypto.randomUUID();

        const newUser = { id, username, password: hashedPassword, email, phoneNumber, token: "" };

        usersData.users.push(newUser);

        jsonfile.writeFileSync("./src/database/users.json", usersData);

        return { message: "Created user" };
    };

    static loginUser(userData: any) {
        const { username, password } = userData;

        const userFound = this.findUser(username);

        if (!userFound) return { error: "Existing user" };

        const hashPassword = crypto
            .createHash("sha256")
            .update(password)
            .digest("hex");

        if (userFound.password !== hashPassword) return { error: "Bad request" };

        const token = crypto.randomUUID();

        userFound.token = token;
        this.writeDbUser();

        return { message: token };
    };

    static readUserById(userId: string) {
        const user = users.users.find((user: any) => user.id === userId);

        if (!user) return { error: "User not found!" };

        const { id, username, email } = user;

        return { message: { id, username, email } };
    };

    static logout = (username: any) => {
        const lowercaseUsername = username.toLowerCase();
        const user = users.users.find((u) => u.username.toLowerCase() === lowercaseUsername);

        console.log(lowercaseUsername);

        if (!user) return { error: "User not found" };

        user.token = "";

        writeFile("./src/database/users.json", users);

        return { message: "Log out User" };
    };

    static updateUser = (userData: any) => {
        const { email, username, password, phoneNumber, usernameParam } = userData;

        const userFound = this.findUser(usernameParam);

        if (!userFound) return { error: "User not found" };

        if (email) userFound.email = email;
        if (username) userFound.username = username;
        if (password) userFound.password = password;
        if (phoneNumber) userFound.phoneNumber = phoneNumber

        this.writeDbUser();
        return {
            message: "user update",
            user: { email: userFound.email, username: userFound.username },
        };
    };

    static deleteUser = (username: string) => {

        const usersData = jsonfile.readFileSync("./src/database/users.json");

        const updatedUsers = usersData.users.filter((user: any) => user.username.toLowerCase() !== username.toLowerCase());

        if (updatedUsers.length === usersData.users.length) return { error: "User not found" };

        usersData.users = updatedUsers;

        jsonfile.writeFileSync("./src/database/users.json", usersData);

        return { message: "Successfully delete user" };
    };
};

export { UserModel };