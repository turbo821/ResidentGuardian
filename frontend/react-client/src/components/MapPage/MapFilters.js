import React, { useState, useEffect } from "react";
import api from "../../api";
import viewStatus from "../../functions/viewStatus";
import getTimeRange from "../../functions/getDates";

const MapFilters = ({ setIssues }) => {
  const [categories, setCategories] = useState([]);
  const STATUSES = [0, 1, 2, 3];
  
  const [selectCategoryId, setSelectCategoryId] = useState("99");
  const [selectStatus, setSelectStatus] = useState("99");
  const [timeRange, setTimeRange] = useState("all");

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

  const handleApply = async() => {
    const params = new URLSearchParams();

    if(selectCategoryId !== "99" && selectCategoryId !== "98") {
      params.append("categoryId", selectCategoryId);
    }
    
    if(selectStatus !== "99" && selectStatus !== "98") {
      params.append("status", selectStatus);
    }

    if(timeRange && timeRange !== "all") {
      const range = getTimeRange(timeRange);
      if(range) {
        params.append("startDate", range[0]);
        params.append("endDate", range[1]);
      }
    }

    console.log(selectCategoryId);
    try {
      const response = await api.get(`/api/issues?${params.toString()}`);
      setIssues(response.data.items);
    } catch(err) {
      console.log(err.response);
    }
  }


  const handleReset = async() => {
    try {
      const response = await api.get(`/api/issues`);
      setIssues(response.data.items);

    } catch(err) {
      console.log(err.response);

    } finally {
      setSelectCategoryId("99");
      setSelectStatus("99");
      setTimeRange("all");
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full lg:w-1/4 mb-6 lg:mb-0 mx-3">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Фильтр</h2>

      <label className="block text-gray-700 font-medium">Категория:</label>
      <select 
        value={selectCategoryId} 
        onChange={(e) => setSelectCategoryId(e.target.value)} 
        className="w-full p-2 border rounded-lg mb-4"
      >
        <option key="99" value={"99"}>Все</option>
        {categories !== null && categories?.length > 0 ? categories.map((cat, index) => (
          <option key={cat.id} value={cat.id}>{cat.title}</option>
        )) 
        : <option key="98" value={"98"}>Категории не найдены</option>}
      </select>

      <label className="block text-gray-700 font-medium">Статус:</label>
      <select 
        value={selectStatus} 
        onChange={(e) => setSelectStatus(e.target.value)} 
        className="w-full p-2 border rounded-lg mb-4"
      >
        <option key="99" value={"99"}>Все</option>
        {STATUSES !== null && STATUSES?.length > 0 ? STATUSES.map((status, index) => (
          <option key={status} value={status}>{viewStatus(status)}</option>
        )) 
        : <option key="98" value={"98"}>Статусы не найдены</option>}
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

      <div className="flex flex-col lg:flex-row justify-center items-center gap-4 mt-2">
          <button
            onClick={handleApply}
            className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition w-4/6"
          >
            Применить
          </button>
          <button
            onClick={handleReset}
            className="bg-gray-400 text-white px-5 py-2 rounded-lg hover:bg-gray-500 transition w-4/6"
          >
            Сбросить
          </button>
        </div>
    </div>
  );
}

export default MapFilters;