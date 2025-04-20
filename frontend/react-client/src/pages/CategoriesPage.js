import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Category from "../components/CategoryPage/Category";
import api from "../api";

const CategoriesPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchAllCategories(); 
  }, []);

  const fetchAllCategories = async() => {
    try {
      const response = await api.get("/api/categories");
      setCategories(response.data);
      console.log(response.data);
    }
    catch(err) {
      console.log(err.response);
    }
  } 

  const goToIssues = (categoryId) => {
    navigate(`/issues?category=${categoryId}`);
  };

  const goToMap = (categoryId) => {
    navigate(`/map?category=${categoryId}`);
  };

  return (
    <div className="min-h-[90vh] bg-blue-100 flex flex-col items-center py-12 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-6xl w-full">
        <h2 className="text-4xl font-bold text-center text-gray-800">Категории проблем</h2>
        <p className="mt-2 text-lg text-center text-gray-700">
          Ознакомьтесь с основными типами проблем, которые можно сообщить через портал.
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.length > 0 ? categories.map((category) => (
            <Category category={category} goToIssues={goToIssues} goToMap={goToMap} key={category.id} />
          )) 
            : <p>Категорий нет</p>
          }
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
