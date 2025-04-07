import React, { useState } from "react";
import { Link } from "react-router-dom";

const IssuesPage = () => {
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const [timeRange, setTimeRange] = useState("all");

  const handleReset = () => {
    setSearchText("");
    setStatus("all");
    setCategory("all");
    setTimeRange("all");
  };

  const handleSearch = () => {
    console.log({
      searchText,
      status,
      category,
      timeRange,
    });
    alert("Поиск выполнен. (Заглушка)");
  };

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
        <h2 className="text-4xl font-bold text-center text-gray-800">Каталог обращений</h2>
        <p className="mt-2 text-lg text-center text-gray-700">
          Ознакомьтесь с проблемами, о которых сообщили жители.
        </p>
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Фильтрация обращений</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* Поиск */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1 text-gray-700">Поиск по названию:</label>
            <input
              type="text"
              placeholder="Введите текст"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Статус */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1 text-gray-700">Статус:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg bg-white"
            >
              <option value="all">Все</option>
              <option value="new">Новые</option>
              <option value="in_progress">В обработке</option>
              <option value="resolved">Решённые</option>
              <option value="rejected">Отклонённые</option>
            </select>
          </div>

          {/* Категория */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1 text-gray-700">Категория:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg bg-white"
            >
              <option value="all">Все</option>
              <option value="road">Дорожные проблемы</option>
              <option value="lighting">Освещение</option>
              <option value="garbage">Мусор</option>
              <option value="landscaping">Благоустройство</option>
              <option value="transport">Общественный транспорт</option>
            </select>
          </div>

          {/* Временной фильтр */}
          <div className="flex flex-col">
            <label className="font-semibold mb-1 text-gray-700">Период:</label>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg bg-white"
            >
              <option value="all">За всё время</option>
              <option value="day">Последний день</option>
              <option value="week">Последняя неделя</option>
              <option value="month">Последний месяц</option>
            </select>
          </div>
        </div>

        {/* Кнопки */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleSearch}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            🔍 Поиск
          </button>

          <button
            onClick={handleReset}
            className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            ♻️ Сбросить фильтры
          </button>
        </div>

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
