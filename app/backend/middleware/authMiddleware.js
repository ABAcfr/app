import jwt from "jsonwebtoken";

export default function (req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Нет токена, авторизация отклонена" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // тут будет id пользователя
    next();
  } catch (err) {
    res.status(401).json({ message: "Неверный токен" });
  }
}
