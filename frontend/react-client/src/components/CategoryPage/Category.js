import React from "react";

const Category = ({ category, goToIssues = () => {}, goToMap = () => {} }) => {
  return (
    <div key={category.id} className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col">
      <img
        src={category.image}
        alt={category.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800">{category.title}</h3>
        <p className="text-sm text-gray-600 mt-2 flex-grow">{category.description}</p>

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
    </div>
  )
}

export default Category;