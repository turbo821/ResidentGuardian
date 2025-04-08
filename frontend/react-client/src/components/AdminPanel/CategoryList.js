import React, { useState } from "react";

const CategoryList = ({ categories = [], setCategories }) => {

  const [editCategory, setEditCategory] = useState(null);

  const handleEditCategory = (id) => {
    setEditCategory(categories.find((cat) => cat.id === id));
  };

  const handleSaveCategory = () => {
    setCategories(categories.map((cat) => (cat.id === editCategory.id ? editCategory : cat)));
    setEditCategory(null);
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };
  
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md md:col-span-2">
      <h3 className="text-xl font-bold text-gray-800">Редактирование категорий</h3>
      <div className="mt-4 space-y-4">
        {categories.map((cat) => (
          <div key={cat.id} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-md">
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
        ))}
      </div>
    </div>
    );
}

const AdminCategoryEdit = ({ editCategory, setEditCategory, handleSaveCategory }) => {
  return (
    <div className="w-full flex flex-col gap-2">
    <input
      type="text"
      value={editCategory.title}
      onChange={(e) => setEditCategory({ ...editCategory, title: e.target.value })}
      className="w-full p-2 border rounded-lg"
    />
    <input
      type="text"
      value={editCategory.description}
      onChange={(e) => setEditCategory({ ...editCategory, description: e.target.value })}
      className="w-full p-2 border rounded-lg"
    />
    <button
      onClick={handleSaveCategory}
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition"
    >
      Сохранить
    </button>
  </div>
  )
};

const AdminCategoryCard = ({ category, handleEditCategory, handleDeleteCategory }) => {
  return (
    <>
      <div>
        <h4 className="text-lg font-bold">{category.title}</h4>
        <p className="text-sm text-gray-600">{category.description}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => handleEditCategory(category.id)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded-lg transition"
        >
          ✏ Редактировать
        </button>
        <button
          onClick={() => handleDeleteCategory(category.id)}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-lg transition"
        >
          ❌ Удалить
        </button>
      </div>
    </>
  )
}

export default CategoryList;