import { useState } from "react";
import api, { setToken } from "../src/api";

export default function Register({ onRegistered }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(0);

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/auth/register", { name, phone, password });
    setStep(1);
    alert("Код отправлен на номер");
  };

  const verify = async (e) => {
    e.preventDefault();
    const code = prompt("Введите код из SMS");
    const res = await api.post("/auth/verify", { phone, code });
    const { token, user } = res.data;
    localStorage.setItem("token", token);
    setToken(token);
    onRegistered && onRegistered(user);
  };

  if (step === 0) {
    return (
      <form onSubmit={submit} className="p-4">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Имя" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Телефон" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Пароль" type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        <button className="text-white px-4 py-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Зарегистрироваться</button>
      </form>
    );
  } else {
    return (
      <div className="p-4">
        <p>Мы отправили код. Подтвердите.</p>
        <button onClick={verify} className="text-white px-4 py-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ввести код и завершить</button>
      </div>
    );
  }
}
