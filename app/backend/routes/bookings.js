// routes/bookings.js
import express from "express";
import Booking from "../models/Booking.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { sendSMS } from "../utils/sms.js"; // <-- исправлено имя
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// GET /api/bookings - тестовый маршрут
router.get("/", (req, res) => {
  res.send("Сервер работает, маршрут GET /api/bookings активен");
});

// POST /api/bookings
// body: { name, phone, service, date, time, createAccount (bool) }
router.post("/", async (req, res) => {
  try {
    const { name, phone, service, date, time, createAccount } = req.body;
    let userId = null;

    // Проверим токен
    const auth = req.headers.authorization;
    if (auth) {
      try {
        const token = auth.split(" ")[1];
        const data = jwt.verify(token, process.env.JWT_SECRET);
        userId = data.id;
      } catch (e) {
        console.warn("JWT verification failed:", e.message);
      }
    }

    // Если не авторизован и createAccount=true → создаём пользователя (unverified)
    if (!userId && createAccount) {
      let user = await User.findOne({ phone });
      if (!user) {
        // Временный пароль
        const tmpPass = Math.random().toString(36).slice(2, 10);
        user = new User({
          name,
          phone,
          passwordHash: tmpPass,
          verified: false
        });
        await user.save();
      }
    }

    // Создаём бронирование
    const booking = new Booking({
      name,
      phone,
      service,
      date,
      time,
      user: userId || null
    });
    await booking.save();

    // Отправка SMS клиенту
    try {
      await sendSMS(phone, `Ваше бронирование: ${service}, ${date} ${time}`); // <-- исправлено имя
    } catch (e) {
      console.warn("SMS failed:", e.message);
    }

    // Уведомление в Telegram
    try {
      const message = `🧾 Новое бронирование:
👤 Имя: ${name}
📱 Телефон: ${phone}
🧹 Услуга: ${service}
🕒 Время: ${time}
📅 Дата: ${date}`;
      
      await axios.post(
        `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
        {
          chat_id: process.env.CHAT_ID,
          text: message
        }
      );
    } catch (e) {
      console.warn("Telegram send failed:", e.message);
    }

    res.status(201).json({ ok: true, booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка при создании бронирования" });
  }
});

export default router;
