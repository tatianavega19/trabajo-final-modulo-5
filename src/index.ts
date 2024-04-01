import express from "express";
import info from "./database/info.json";
import { userRouter } from "./router/user";
import { trapezeRouter } from "./router/aerialTrapeze";
import morgan from "morgan";
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));

const PORT = process.env.PORT;

app.get("/api", (req, res) => {
  res.json(info);
});

app.use("/api/users", userRouter);
app.use("/api/trapeze", trapezeRouter);

app.use("*", (req, res) => {
  res.status(404).json({ error: "Resourse not found" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});