import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryPage = () => {
  const navigate = useNavigate();

  // Категории проблем
  const categories = [
    { id: "road", title: "Дорожные проблемы", description: "Ямы, трещины, отсутствие разметки, поврежденные знаки." },
    { id: "lighting", title: "Освещение", description: "Неисправные фонари, отсутствие освещения на улицах и в парках." },
    { id: "garbage", title: "Мусор", description: "Несвоевременный вывоз мусора, переполненные урны, свалки." },
    { id: "landscaping", title: "Благоустройство", description: "Сломанные лавочки, поврежденные детские площадки, отсутствие озеленения." },
    { id: "transport", title: "Общественный транспорт", description: "Поломанные остановки, нехватка маршрутов, нерегулярное движение транспорта." },
    { id: "other", title: "Другое", description: "Все остальные проблемы, не входящие в указанные категории." },
  ];

  // Функции перехода с фильтрами
  const goToIssues = (category) => {
    navigate(`/issues?category=${category}`);
  };

  const goToMap = (category) => {
    navigate(`/map?category=${category}`);
  };

  return (
    <div className="min-h-[90vh] bg-blue-100 flex flex-col items-center py-12 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-6xl w-full">
        {/* Заголовок */}
        <h2 className="text-4xl font-bold text-center text-gray-800">Категории проблем</h2>
        <p className="mt-2 text-lg text-center text-gray-700">
          Ознакомьтесь с основными типами проблем, которые можно сообщить через портал.
        </p>

        {/* Список категорий (адаптивная сетка) */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="bg-white shadow-lg rounded-lg p-4 flex flex-col">
              <h3 className="text-lg font-bold text-gray-800">{category.title}</h3>
              <p className="text-sm text-gray-600 mt-2 flex-grow">{category.description}</p>

              {/* Ссылки */}
              <div className="mt-4">
                <button 
                  onClick={() => goToIssues(category.id)} 
                  className="block text-green-500 hover:underline font-bold text-sm"
                >
                  Смотреть обращения
                </button>
                <button 
                  onClick={() => goToMap(category.id)} 
                  className="block text-blue-500 hover:underline font-bold text-sm mt-1"
                >
                  Смотреть на карте
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
