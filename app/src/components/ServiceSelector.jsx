import { Link } from "react-router-dom";

export const services = [
  { 
    id: 1, 
    name: "Все виды клининга", 
    icon: "🧹", 
    desc: "Клининг после ремонта, высотный клининг, генеральная уборка, химчистка мягкой мебели."
  },
  { 
    id: 2, 
    name: "Вывоз мусора с вашей локации", 
    icon: "🗑️", 
    desc: "Вывоз мусора с вашей локации и вывоз строй мусора."
  },
  { 
    id: 3, 
    name: "Полировка и кристаллизация мрамора", 
    icon: "🪞", 
    desc: "Все виды услуг по мрамору."
  },
  { 
    id: 4, 
    name: "IT-услуги", 
    icon: "💻", 
    desc: "Все виды IT услуг."
  },
  { 
    id: 5, 
    name: "Сантехника", 
    icon: "🚰", 
    desc: "Устранение неполадок, устранение засоров и др."
  },
  { 
    id: 6, 
    name: "Электрика", 
    icon: "🔌", 
    desc: "Все монтажные и электротехнические услуги."
  },
  { 
    id: 7, 
    name: "Системы охлаждения и вентиляции", 
    icon: "❄️", 
    desc: "Наладка, ремонт кондиционеров и профилактические работы."
  },
  { 
    id: 8, 
    name: "Доставка товара", 
    icon: "📦", 
    desc: "Услуги доставки товаров с точки приёма до вашей локации по территории ТСМall."
  },
  { 
    id: 9, 
    name: "Предоставление охраны по вашей локации", 
    icon: "👮", 
    desc: "Охрана объектов, видеонаблюдение, контроль доступа, патрулирование."
  },
  { 
    id: 10, 
    name: "Услуги арома-диффузоров в вашей локации", 
    icon: "🌸", 
    desc: "Аренда, продажа и заправка арома диффузоров для дома и бизнеса."
  }
];

  
  const ServiceSelector = ({ onSelect }) => (
    <div className="p-4 grid grid-cols-2 gap-4">
      {services.map((service) => (
        <Link
          key={service.id}
          to={`/services/${service.id}/bookings`}
          onClick={() => onSelect(service)}
          className=" p-4 rounded-lg text-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-800 dark:border-gray-700"
        >
          <div className="text-3xl">{service.icon}</div>
          <div className="mt-2 text-base text-gray-900 dark:text-white">{service.name}</div>
          <div className="mt-2 text-sm text-gray-700 dark:text-gray-400">{service.desc}</div>
        </Link>
      ))}
    </div>
  );
  
  export default ServiceSelector;
  