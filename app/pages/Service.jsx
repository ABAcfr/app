// src/pages/Services.jsx
import ServiceSelector from "../src/components/ServiceSelector";

export default function Services() {
  return (
    <div className="pb-16"> {/* отступ снизу для меню */}
      <h1 className="text-lg font-bold p-4 text-gray-900 dark:text-white">ПРЕДОСТАВЛЯЕМЫЕ УСЛУГИ</h1>
      <ServiceSelector onSelect={(service) => console.log(service)} />
    </div>
  );
}
