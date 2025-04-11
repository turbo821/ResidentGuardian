import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Category from "../components/CategoryPage/Category";

const categoriesData = [
  {
    id: "road",
    title: "Дорожные проблемы",
    description: "Ямы, трещины, отсутствие разметки, поврежденные знаки.",
    image: "images/road-problem.png"
  },
  {
    id: "lighting",
    title: "Освещение",
    description: "Неисправные фонари, отсутствие освещения на улицах и в парках.",
    image: "images/lantern.png"
  },
  {
    id: "garbage",
    title: "Мусор",
    description: "Несвоевременный вывоз мусора, переполненные урны, свалки.",
    image: "images/garbage.png"
  },
  {
    id: "landscaping",
    title: "Благоустройство",
    description: "Сломанные лавочки, поврежденные детские площадки, отсутствие озеленения.",
    image: "images/improvement.png"
  },
  {
    id: "transport",
    title: "Общественный транспорт",
    description: "Поломанные остановки, нехватка маршрутов, нерегулярное движение транспорта.",
    image: "images/transport.png"
  },
  {
    id: "other",
    title: "Другое",
    description: "Все остальные проблемы, не входящие в указанные категории.",
    image: "images/common.png"
  }
];

const CategoriesPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = () => {
      setCategories(categoriesData);
    };
    fetchCategories();
  },[]);


  const goToIssues = (category) => {
    navigate(`/issues?category=${category}`);
  };

  const goToMap = (category) => {
    navigate(`/map?category=${category}`);
  };

  return (
    <div className="min-h-[90vh] bg-blue-100 flex flex-col items-center py-12 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-6xl w-full">
        <h2 className="text-4xl font-bold text-center text-gray-800">Категории проблем</h2>
        <p className="mt-2 text-lg text-center text-gray-700">
          Ознакомьтесь с основными типами проблем, которые можно сообщить через портал.
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Category category={category} goToIssues={goToIssues} goToMap={goToMap} key={category.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
