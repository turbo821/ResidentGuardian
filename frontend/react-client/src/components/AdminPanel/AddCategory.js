import React, { useState, useRef } from "react";
import api from "../../api";
import UploadImage from "../ReportPage/UploadImage";

const AddCategory = ({ setCategories }) => {
  const fileInputRef = useRef(null);
  const [newCategory, setNewCategory] = useState({
    title: "",
    description: "",
    image: null
  });

  const handleAddCategory = async() => {
    if (!newCategory.image) return alert('Выберите картинку');

    try {
      const response = await api.post('/api/categories', newCategory, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const category = response.data;
      setCategories((prev) => [...prev, category]);

    } catch (err) {
      console.log(err.response);
    }
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setNewCategory({
      title: "",
      description: "",
      image: null
    });
  };
  
  const handleImageUpload = (e) => {
    setNewCategory({...newCategory, image: e.target.files[0]})
  };

  const removeImage = () => {
    setNewCategory({...newCategory, image: null})
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

        {/* <label className="block text-gray-700 font-bold">Выбор картинки:</label>
        <input 
          ref={fileInputRef}
          type="file" 
          accept="image/*"
          onChange={e => setNewCategory({...newCategory, image: e.target.files[0]})} 
          className="block text-gray-700 font-bold p-2 mb-3"
        /> */}

        <UploadImage 
          fileInputRef={fileInputRef} 
          handleImageUpload={handleImageUpload} 
          image={newCategory.image} 
          removeImage={removeImage} 
          multiple={false} 
        />

        <button 
          onClick={handleAddCategory} 
          className="mt-2 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          Добавить категорию
        </button>
      </div>
    </div>
    );
}

export default AddCategory;