import React, { useState } from "react";

const MapPage = () => {
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [date, setDate] = useState("");

  return (
    <div className="min-h-[90vh] bg-blue-100 flex flex-col lg:flex-row items-start py-12 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full lg:w-1/4 mb-6 lg:mb-0">
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

        <label className="block text-gray-700 font-medium">Дата:</label>
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          className="w-full p-2 border rounded-lg"
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full lg:w-3/4 flex items-center justify-center">
        <span className="text-gray-400 text-lg">[Тут будет карта]</span>
      </div>
    </div>
  );
};

export default MapPage;
