import React, { useState } from "react";

const AddCategory = () => {
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    alert(`Добавлена категория: ${newCategory}`);
    setNewCategory("");
  };
  
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md md:col-span-2">
      <h3 className="text-xl font-bold text-gray-800">Добавление категории</h3>
      <div className="mt-4">
        <input 
          type="text" 
          placeholder="Название новой категории" 
          value={newCategory} 
          onChange={(e) => setNewCategory(e.target.value)} 
          className="w-full p-2 border rounded-lg mb-3"
        />
        <button 
          onClick={handleAddCategory} 
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          Добавить категорию
        </button>
      </div>
    </div>
    );
}

export default AddCategory;