import React, { useState } from "react";
import { Link } from "react-router-dom";

const IssuesPage = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // Заглушка списка обращений
  const issues = [
    { id: 1, title: "Яма на дороге", status: "В ожидании", image: "https://via.placeholder.com/150" },
    { id: 2, title: "Не работает фонарь", status: "Решено", image: "https://via.placeholder.com/150" },
    { id: 3, title: "Сломанная лавочка", status: "В процессе", image: "https://via.placeholder.com/150" },
    { id: 4, title: "Грязь на тротуаре", status: "В ожидании", image: "https://via.placeholder.com/150" },
    { id: 5, title: "Разбитая урна", status: "Решено", image: "https://via.placeholder.com/150" },
    { id: 6, title: "Неправильная парковка", status: "В процессе", image: "https://via.placeholder.com/150" },
  ];

  return (
    <div className="min-h-[90vh] bg-blue-100 flex flex-col items-center py-12 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-6xl w-full">
        {/* Заголовок */}
        <h2 className="text-4xl font-bold text-center text-gray-800">Каталог обращений</h2>
        <p className="mt-2 text-lg text-center text-gray-700">
          Ознакомьтесь с проблемами, о которых сообщили жители.
        </p>

        {/* Поиск и фильтрация */}
        <div className="mt-6 flex flex-col md:flex-row gap-4">
          <input 
            type="text" 
            placeholder="Поиск обращений..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className="w-full p-3 border rounded-lg"
          />
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)} 
            className="w-full md:w-1/3 p-3 border rounded-lg"
          >
            <option value="all">Все</option>
            <option value="pending">В ожидании</option>
            <option value="in-progress">В процессе</option>
            <option value="resolved">Решенные</option>
          </select>
        </div>

        {/* Список обращений (Адаптивная сетка) */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {issues.map((issue) => (
            <div key={issue.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={issue.image} alt={issue.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{issue.title}</h3>
                <p className="text-sm text-gray-600">{issue.status}</p>
                <Link 
                  to={`/issues/${issue.id}`} 
                  className="text-green-500 hover:underline font-bold block mt-2"
                >
                  Подробнее
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Кнопка "Создать обращение" */}
        <div className="mt-6 text-center">
          <Link 
            to="/report" 
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            Создать обращение
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IssuesPage;
