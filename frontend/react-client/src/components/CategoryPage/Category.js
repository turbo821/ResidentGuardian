import React from "react";
import { imagesURL } from "../../api";

const Category = ({ category, goToIssues = () => {} }) => {
  return (
    <div key={category.id} className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col">
      <img
        src={`${imagesURL}/${category.imageUri}`}
        alt={category.imageUri}
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
        </div>
      </div>
    </div>
  )
}

export default Category;