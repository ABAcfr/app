import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Services from "../pages/Service";
import ServiceDetails from "./components/ServiceDetails"; // будет показывать и ссылку на /services/:id/book
import BookingForm from "./components/BookingForm";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Navbar from "./components/Navbar";
import { setToken } from "./api";

const token = localStorage.getItem("token");
if (token) setToken(token);

export default function App(){
  return (
    <BrowserRouter>
      <div className="max-w-md mx-auto relative min-h-screen pb-20">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/services" element={<Services/>} />
          <Route path="/services/:id" element={<ServiceDetails/>} />
          <Route path="/services/:id/bookings" element={<BookingFormWrapper/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
        <Navbar/>
      </div>
    </BrowserRouter>
  )
}

// небольшой wrapper, чтобы получить service name по id и передать в BookingForm
import { useParams } from "react-router-dom";
import { services } from "./components/ServiceSelector";
function BookingFormWrapper(){
  const { id } = useParams();
  const service = services.find(s=>String(s.id)===id);
  return <BookingForm initialServiceName={service?.name || "Неизвестная услуга"} />;
}
