// sms.js
import fetch from "node-fetch";

const API_KEY = process.env.SMSRU_API_KEY;

export async function sendSMS(phone, text) {
  const url = `https://sms.ru/sms/send?api_id=${API_KEY}&to=${phone}&msg=${encodeURIComponent(text)}&json=1`;
  const res = await fetch(url);
  const data = await res.json();
  console.log("SMS.RU response:", data);
  return data;
}
