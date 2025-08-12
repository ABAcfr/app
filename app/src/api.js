import axios from "axios";

const base = axios.create({
  baseURL: "http://localhost:5000/api",
});



export function setToken(token) {
  if (token) base.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete base.defaults.headers.common["Authorization"];
}



export default base;  
