import React, { useState } from "react";

const MapFilters = () => {
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [timeRange, setTimeRange] = useState("");

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full lg:w-1/4 mb-6 lg:mb-0 mx-3">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Фильтр</h2>

      <label className="block text-gray-700 font-medium">Категория:</label>
      <select 
        value={category} 
        onChange={(e) => setCategory(e.target.value)} 
        className="w-full p-2 border rounded-lg mb-4"
      >
        <option value="all">Все</option>
        <option value="road">Дорожные проблемы</option>
        <option value="lighting">Освещение</option>
        <option value="garbage">Мусор</option>
        <option value="other">Другое</option>
      </select>

      <label className="block text-gray-700 font-medium">Статус:</label>
      <select 
        value={status} 
        onChange={(e) => setStatus(e.target.value)} 
        className="w-full p-2 border rounded-lg mb-4"
      >
        <option value="all">Все</option>
        <option value="pending">В ожидании</option>
        <option value="in-progress">В процессе</option>
        <option value="resolved">Решенные</option>
      </select>

      <label className="block text-gray-700 font-medium">Период:</label>
      <select
        value={timeRange}
        onChange={(e) => setTimeRange(e.target.value)}
        className="w-full p-2 border rounded-lg mb-4"
      >
        <option value="all">За всё время</option>
        <option value="day">Последний день</option>
        <option value="week">Последняя неделя</option>
        <option value="month">Последний месяц</option>
      </select>
    </div>
  );
}

export default MapFilters;