import { Link } from "react-router-dom";
import cityMap from "../assets/images/map-image3.jpg";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="bg-blue-100">

      {/* Hero Section с фоновым изображением */}
      <div className="sity-image">
      <section
        className="container mx-auto px-4 py-16 space-y-16 relative bg-cover bg-center text-white py-32 px-6 flex items-center"
        
      >
        <div className="bg-blue-500 bg-opacity-50 p-8 rounded-lg max-w-lg">
          <h1 className="text-4xl font-bold">Добро пожаловать в ResidentGuardian</h1>
          <p className="mt-4 text-lg">
            Платформа для подачи обращений о проблемах городского хозяйства. 
            Сообщите о проблеме, и она не останется без внимания.
          </p>
          <div className="mt-6 space-y-3">
            <Link 
              to="/report" 
              className="block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition text-center"
            >
              Сообщить о проблеме
            </Link>
            <Link 
              to="/about" 
              className="block text-green-500 hover:underline font-bold text-center"
            >
              Подробнее
            </Link>
          </div>
        </div>
      </section>
      </div>


      {/* Map Section */}
      <section className="container mx-auto px-4 py-16 space-y-16 flex flex-col md:flex-row items-center">
        <div className="text-white md:w-1/2 bg-blue-500 bg-opacity-50 p-8 rounded-lg max-w-lg">
          <h2 className="text-3xl font-bold">Карта городских проблем</h2>
          <p className="mt-4 text-lg max-w-2xl">
            Просматривайте существующие проблемы на карте и следите за их решением.
          </p>
          <Link 
            to="/map" 
            className="mt-6 inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            Перейти к карте
          </Link>
        </div>
        <div className="md:w-1/2 flex justify-end">
          <img src={cityMap} alt="Карта проблем" className="map-image w-full h-auto rounded-lg shadow-lg" />
        </div>
      </section>

      {/* Hot Issues Section */}
      <section className="container mx-auto px-4 py-16 space-y-16">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-left">Актуальные проблемные темы</h2>
          <p className="mt-2 text-lg text-left">
            Ознакомьтесь с последними проблемами, затронувшими город.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Карточки проблем */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src="https://via.placeholder.com/150" alt="Проблема" className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">Проблема 1</h3>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src="https://via.placeholder.com/150" alt="Проблема" className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">Проблема 2</h3>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src="https://via.placeholder.com/150" alt="Проблема" className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">Проблема 3</h3>
            </div>
          </div>
        </div>

        <div className="mt-6 text-left">
          <Link to="/issues" className="text-green-500 hover:underline font-bold text-lg">
            Смотреть все темы
          </Link>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
