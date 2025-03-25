import React, { useState } from "react";

const ModeratorPanel = () => {
  const [categories, setCategories] = useState([
    { id: "road", title: "Дорожные проблемы", description: "Ямы, трещины, поврежденные знаки." },
    { id: "lighting", title: "Освещение", description: "Неисправные фонари, отсутствие освещения." },
    { id: "garbage", title: "Мусор", description: "Несвоевременный вывоз мусора, свалки." },
    { id: "landscaping", title: "Благоустройство", description: "Лавочки, детские площадки, озеленение." },
    { id: "transport", title: "Общественный транспорт", description: "Поломанные остановки, нехватка маршрутов." },
  ]);

  return (
    <div className="min-h-[90vh] bg-blue-100 flex flex-col items-center py-12 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-6xl w-full">
        <h2 className="text-4xl font-bold text-center text-gray-800">Панель модератора</h2>
        <p className="mt-2 text-lg text-center text-gray-700">
          Отвечайте на обращения
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">


        </div>
      </div>
    </div>
  );
};

export default ModeratorPanel;