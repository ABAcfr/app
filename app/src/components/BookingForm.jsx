// src/components/BookingForm.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api, { setToken } from "../api";
import { services } from "./ServiceSelector";

const times = [
  "00:00-01:00", "01:00-02:00", "02:00-03:00", "03:00-04:00", "04:00-05:00",
  "05:00-06:00", "06:00-07:00", "07:00-08:00", "08:00-09:00", "09:00-10:00",
  "10:00-11:00", "11:00-12:00", "12:00-13:00", "13:00-14:00", "14:00-15:00",
  "15:00-16:00", "16:00-17:00", "17:00-18:00", "18:00-19:00", "19:00-20:00",
  "20:00-21:00", "21:00-22:00", "22:00-23:00", "23:00-00:00",
];

export default function BookingForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = services.find(s => String(s.id) === id);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [createAccount, setCreateAccount] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      api.get("/auth/profile")
        .then(r => {
          setName(r.data.name || "");
          setPhone(r.data.phone || "");
        })
        .catch(() => {});
    }
  }, []);

  if (!service) {
    return <div className="p-6 text-red-500">Услуга не найдена</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!time) {
      alert("Пожалуйста, выберите время");
      return;
    }

    let token = localStorage.getItem("token");

    // Если нет токена и выбрано создание аккаунта — регистрируем
    if (!token && createAccount) {
      try {
        await api.post("/auth/register", { name, phone, password });
        alert("Код отправлен на ваш номер");
        const code = prompt("Введите код из SMS");
        const res = await api.post("/auth/verify", { phone, code });
        token = res.data.token;
        localStorage.setItem("token", token);
        setToken(token);
      } catch (err) {
        console.error(err);
        alert("Ошибка при регистрации");
        return;
      }
    }

    try {
      const bookingData = {
        name,
        phone,
        date,
        time,
        service: service.name,
      };
      const res = await api.post("/bookings", bookingData);
      if (res.status === 201 || res.status === 200) {
        alert("Бронирование успешно отправлено!");
        navigate("/");
      } else {
        alert("Ошибка при бронировании");
      }
    } catch (err) {
      console.error(err);
      alert("Ошибка соединения с сервером");
    }
  };

  return (
    <div className="p-6 pb-24">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Форма бронирования</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        <strong className="text-gray-900 dark:text-white">Выбранная услуга:</strong> {service.name}
      </p>
        <p className="mt-2 text-gray-700 dark:text-gray-300 mb-3">{service.desc}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-4 py-2 rounded bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />

        <input
          type="tel"
          placeholder="Телефон"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border px-4 py-2 rounded bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
        
        
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border px-4 py-2 rounded bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          min={new Date().toISOString().split("T")[0]}
        />


        <div className="p-4  rounded">
          <h3 className="text-md font-bold mb-2 dark:text-white ">Выберите удобное время:</h3>
          <div className="grid grid-cols-2 gap-2">
            {times.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTime(t)}
                className={`border p-2 rounded bg-gray-50 border-gray-300 text-gray-900 dark:text-white dark:bg-gray-700 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600  ${
                  time === t ? "bg-blue-200" : "dark:bg-gray-900"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          {time && (
            <p className="mt-2 text-sm text-gray-600 dark:text-white">
              Вы выбрали: <strong>{time}</strong>
            </p>
          )}
        </div>

        <label className="flex items-center gap-2 text-gray-900 dark:text-white">
          <input
            type="checkbox"
            checked={createAccount}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            onChange={(e) => setCreateAccount(e.target.checked)}
          />{" "}
          Создать аккаунт с этими данными
        </label>

        {createAccount && (
          <input
            type="password"
            placeholder="Пароль для аккаунта"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-4 py-2 rounded bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        )}

        <button
          type="submit"
          className="text-white px-6 py-2 rounded hover:bg-blue-700 w-full flex items-center justify-center bg-purple-600 text-white font-bold py-2 px-6 rounded mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Забронировать
        </button>
      </form>
    </div>
  );
}
