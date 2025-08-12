import { useEffect, useState } from "react";
import api from "../src/api";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get("/auth/profile").then(r => setUser(r.data));

  }, []);

  if (!user) return <div className="p-4">Не авторизован</div>;
  return (
    <div className="p-4">
      <h3>{user.name}</h3>
      <p>{user.phone}</p>
    </div>
  );
}
