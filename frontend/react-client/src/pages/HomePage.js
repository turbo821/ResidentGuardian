import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="bg-[#2C3E50] text-white min-h-screen">
      {/* Main Section */}
      <section className="text-center py-16 px-4">
        <h1 className="text-4xl font-bold">Добро пожаловать в ResidentGuardian</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Платформа для подачи обращений о проблемах городского хозяйства. 
          Сообщите о проблеме, и она не останется без внимания.
        </p>
        <Link
          to="/report"
          className="mt-6 inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition"
        >
          Сообщить о проблеме
        </Link>
      </section>

      {/* Map Section */}
      <section className="bg-gray-800 py-16 text-center">
        <h2 className="text-3xl font-bold">Карта городских проблем</h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Просматривайте существующие проблемы на карте и следите за их решением.
        </p>
        {/* Место для изображения карты */}
        <div className="w-full h-64 bg-gray-700 mt-6 flex items-center justify-center">
          <span className="text-gray-400">[Изображение карты]</span>
        </div>
        <Link
          to="/map"
          className="mt-6 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition"
        >
          Перейти к карте
        </Link>
      </section>

      {/* Hot Issues Section */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold">Актуальные проблемные темы</h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Ознакомьтесь с последними проблемами, затронувшими город.
        </p>
        <div className="mt-6 space-y-4">
          {/* Здесь можно динамически загружать актуальные темы */}
          <div className="bg-gray-800 p-4 rounded-lg">Проблема 1</div>
          <div className="bg-gray-800 p-4 rounded-lg">Проблема 2</div>
          <div className="bg-gray-800 p-4 rounded-lg">Проблема 3</div>
        </div>
        <Link
          to="/issues"
          className="mt-6 inline-block bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition"
        >
          Смотреть все темы
        </Link>
      </section>

    </div>
  );
};

export default HomePage;
