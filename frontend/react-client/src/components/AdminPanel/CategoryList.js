import React, { useState } from "react";
import api from "../../api";
import AdminCategoryEdit from "./AdminCategoryEdit";
import AdminCategoryCard from "./AdminCategoryCard";

const CategoryList = ({ categories = [], setCategories }) => {
  const [editCategory, setEditCategory] = useState(null);

  const handleEditCategory = (id) => {
    setEditCategory(categories.find((cat) => cat.id === id));
  };

  const handleSaveCategory = async() => {
    const updateCategory = await fetchEditCategory(editCategory);

    setCategories(categories.map((cat) => (cat.id === updateCategory.id ? updateCategory : cat)));
    setEditCategory(null);
  };

  const fetchEditCategory = async (category) => {
    try {
      const response = await api.put("/api/categories", category, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    }
    catch(err) {
      console.log('Ошибка загрузки: ' + err.response?.data || err.message);
    }
  }

  const handleDeleteCategory = async(id) => {
    try {
      await api.delete(`/api/categories/${id}`);
    }
    catch(err) {
      console.log(err.response);
    }
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };
  
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md md:col-span-2">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Список категорий</h3>

      <div className="grid gap-4">
        {categories.length > 0 ? categories.map((cat) => (
          <div key={cat.id} className="bg-white rounded-xl shadow-md p-4">
            {editCategory && editCategory.id === cat.id ? (
              <AdminCategoryEdit
                editCategory={editCategory}
                setEditCategory={setEditCategory}
                handleSaveCategory={handleSaveCategory}
              />
            ) : (
              <AdminCategoryCard
                category={cat}
                handleDeleteCategory={handleDeleteCategory}
                handleEditCategory={handleEditCategory}
              />
            )}
          </div>
        )) 
        : <p>Категорий нет</p>}
      </div>
    </div>
  );
}

export default CategoryList;