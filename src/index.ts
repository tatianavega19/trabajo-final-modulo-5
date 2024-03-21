import express from "express";
import info from "./database/info.json";
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT

app.get("/api", (req, res) => {
  res.json(info);
});

app.use("*", (req, res) => {
  res.status(404).json({ error: "Resourse not found" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});