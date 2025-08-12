// ServiceDetails.jsx
import { useParams, Link } from "react-router-dom";
import { services } from "./ServiceSelector";

export default function ServiceDetails() {
  const { id } = useParams();
  const service = services.find(s => s.id === Number(id));

  if (!service) return <p>Услуга не найдена</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">{service.name}</h2>
      <p className="mt-2 text-gray-700 dark:text-gray-300">{service.desc}</p>
      <Link
        to={`/services/${service.id}/book`}
        className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Выбрать время
      </Link>
    </div>
  );
}
