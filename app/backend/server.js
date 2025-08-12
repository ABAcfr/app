import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js"; // 👈 новый роут
import bookingsRoutes from "./routes/bookings.js";




dotenv.config();
const app = express(); // создаём app

// Раздача статики React
app.use(express.static('dist'));

app.use(cors());
app.use(express.json());

// Роуты
app.use("/api/auth", authRoutes);
app.use("/api/auth", profileRoutes); // 👈 подключаем
app.use("/api/bookings", bookingsRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.listen(5000, () => console.log("Server running on port 5000"));
