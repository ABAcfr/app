import { Link } from "react-router-dom";

const HeroSection = ({ onNext }) => (
  
    <div className="flex flex-col items-center justify-around h-screen px-4 py-8 text-center bg-white bg-center bg-no-repeat  dark:bg-gray-900 bg-blend-multiply">
<div className="flex gap-5 items-center">
<img src="/HYPER.svg" alt="Hyper Service Management" className="h-8 mb-4" />
      <div className="text-center ">
  <p className="text-[24px] tracking-[0.3em] font-bold text-blue-700">SERVICE</p>
  <p className="text-[20px] tracking-[0.15em] font-bold text-blue-700">MANAGEMENT</p>
</div>
</div>
      <div>
        <h6 className="uppercase tracking-tight text-gray-900 text-sm font-bold leading-5 mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-3xl lg:text-5xl dark:text-white  ">
          КЛИНИНГОВАЯ КОМПАНИЯ В ТАШКЕНТЕ – УБОРКА ДОМОВ, ОФИСОВ, <span className="text-green-500">ЗАВОДОВ</span>,<br />
          МОЙКА ФАСАДОВ, ХИМЧИСТКА МЕБЕЛИ, ОЗОНИРОВАНИЕ ПОМЕЩЕНИЙ.
        </h6>
        <p className="text-xs mt-2 mb-8 text-lg font-normal text-gray-700 dark:text-gray-300 ">– Уборка после строительства в день обращения</p>
      </div>
      <div>
      <Link
  to="/services"
  className="flex items-center justify-center bg-purple-600 text-white font-bold py-2 px-6 rounded mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
>
  БРОНИРОВАНИЕ
  <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
</Link>

      </div>
    </div>
  );
  
  export default HeroSection;
  