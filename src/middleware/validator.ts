import { Request, Response, NextFunction } from "express";
import users from "../database/users.json";

const validatorAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.get("Authorization");
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  const user = users.users.find((u) => u.token === token);
  if (!user) return res.status(404).json({ error: "User not found" });

  next();
};

export { validatorAuth };