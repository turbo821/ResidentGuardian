import React, { useState, useEffect } from "react";
import api from "../../api";
import viewStatus from "../../functions/viewStatus";

const Filters = ({ 
  selectCategoryId, setSelectCategoryId,
  selectStatus, setSelectStatus, 
  timeRange, setTimeRange, 
  sortBy, setSortBy,
  handleApply, handleReset,
  currentPage }) => {

  const [categories, setCategories] = useState([]);
  const STATUSES = [0, 1, 2, 3];

  const SORT_OPTIONS = [
    { value: 0, label: 'Сначала новые' },
    { value: 1, label: 'Сначала старые' },
    { value: 2, label: 'По рейтингу' },
  ];

  useEffect(() => {
    fetchAllCategories(); 
  }, []);

  const fetchAllCategories = async() => {
    try {
      const response = await api.get("/api/categories");
      setCategories(response.data);
    }
    catch(err) {
      console.log(err.response);
    }
  } 

  return (
    <div className="flex flex-col gap-4 mb-6 bg-slate-200 px-6 py-3 rounded-xl m-5">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 mt-4">
        <div className="flex flex-col">
          <label className="font-semibold mb-1 text-gray-700">Категория:</label>
          <select
            value={selectCategoryId}
            onChange={(e) => setSelectCategoryId(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg bg-white"
          >
            <option key="99" value={"99"}>Все</option>
            {categories !== null && categories.length > 0 ? categories.map((cat, index) => (
              <option key={cat.id} value={cat.id}>{cat.title}</option>
            )) 
            : <option key="98" value={"98"}>Категории не найдены</option>}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1 text-gray-700">Статус:</label>
          <select
            value={selectStatus}
            onChange={(e) => setSelectStatus(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg bg-white"
          >
            <option key="99" value={null}>Все</option>
            {STATUSES !== null && STATUSES.length > 0 ? STATUSES.map((status, index) => (
              <option key={status} value={status}>{viewStatus(status)}</option>
            )) 
            : <option key="98" value={null}>Статусы не найдены</option>}
          </select>
        </div>

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

        <div className="flex flex-col">
          <label className="font-semibold mb-1 text-gray-700">Сортировка:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg bg-white"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-2">
          <button
            onClick={() => handleApply(currentPage)}
            className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Применить
          </button>
          <button
            onClick={handleReset}
            className="bg-gray-400 text-white px-5 py-2 rounded-lg hover:bg-gray-500 transition"
          >
            Сбросить
          </button>
        </div>
    </div>
  )
}

export default Filters;