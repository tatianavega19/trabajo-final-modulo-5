import jsonfile from "jsonfile";

class UserModel {
    static getAllUsers() {
        const usersData = jsonfile.readFileSync("./src/database/users.json");
        return usersData.users.map((user: any) => ({
            username: user.username,
            email: user.email,
        }));
    };
};

export { UserModel }