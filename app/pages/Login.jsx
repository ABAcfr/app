import { useState } from "react";
import api, { setToken } from "../src/api";

export default function Login({ onLogin }) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { phone, password });
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      setToken(token);
      onLogin && onLogin(user);
    } catch (err) {
      alert(err.response?.data?.error || "Ошибка");
    }
  };

  return (
    <form onSubmit={submit} className="p-4">
      <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Телефон" className="w-full mb-2" />
      <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Пароль" type="password" className="w-full mb-2" />
      <button className="bg-blue-600 text-white px-4 py-2">Войти</button>
    </form>
  );
}
