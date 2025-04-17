import React, { useState } from "react";
import api from "../../api";

const AddCategory = () => {
  const [newCategory, setNewCategory] = useState({
    title: "",
    description: "",
    image: null
  });

  const handleAddCategory = async() => {
    if (!newCategory.image) return alert('Выберите файл');

    try {
      const response = await api.post('/api/categories', newCategory, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert(`Добавлена категория: ${response.data} ${newCategory.title} ${newCategory.description}`);

    } catch (err) {
      alert('Ошибка загрузки: ' + err.response?.data || err.message);
    }
    
    setNewCategory({
      title: "",
      description: "",
      image: null
    });
  };
  
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md md:col-span-2">
      <h3 className="text-xl font-bold text-gray-800">Добавление категории</h3>
      <div className="mt-4">
        <input 
          type="text" 
          placeholder="Название новой категории" 
          value={newCategory.title} 
          onChange={e => setNewCategory({...newCategory, title: e.target.value})} 
          className="w-full p-2 border rounded-lg mb-3"
        />
        <input 
          type="text" 
          placeholder="Описание новой категории" 
          value={newCategory.description} 
          onChange={e => setNewCategory({...newCategory, description: e.target.value})} 
          className="w-full p-2 border rounded-lg mb-3"
        />
        <label className="block text-gray-700 font-bold">Выбор картинки:</label>
        <input 
          type="file" 
          accept="image/*"
          onChange={e => setNewCategory({...newCategory, image: e.target.files[0]})} 
          className="block text-gray-700 font-bold p-2 mb-3"
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