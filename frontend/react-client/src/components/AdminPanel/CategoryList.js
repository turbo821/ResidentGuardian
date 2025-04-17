import React, { useState } from "react";
import api from "../../api";
import { imagesURL } from "../../api";

const CategoryList = ({ categories = [], setCategories }) => {

  const [editCategory, setEditCategory] = useState(null);

  const handleEditCategory = (id) => {
    setEditCategory(categories.find((cat) => cat.id === id));
  };
  
  const handleDeleteCategory = async(id) => {
    await fetchDeleteCategory(id);
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  const fetchDeleteCategory = async(id) => {
    try {
      await api.delete(`/api/categories/${id}`);
    }
    catch(err) {
      console.log(err.response);
    }
  }

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

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md md:col-span-2">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Редактирование категорий</h3>

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

const AdminCategoryEdit = ({ editCategory, setEditCategory, handleSaveCategory }) => {

  const handleCancel = () => {
    setEditCategory(null);
  };

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
      <label className="block text-gray-700 font-bold">Выбор картинки:</label>
      <input 
        type="file" 
        accept="image/*"
        onChange={e => setEditCategory({...editCategory, image: e.target.files[0]})} 
        className="block text-gray-700 font-bold p-2 mb-3"
      />
      <div className="flex gap-2 justify-around ">
        <button
          onClick={handleSaveCategory}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded transition w-full"
        >
          Сохранить
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 rounded transition w-full"
        >
          ✖ Отменить
        </button>
      </div>
  </div>
  )
};

const AdminCategoryCard = ({ category, handleEditCategory, handleDeleteCategory }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row items-start gap-4 p-4 border rounded-xl shadow-sm bg-white">
      <img
        src={`${imagesURL}/${category.imageUri}`}
        alt={category.imageUri}
        className="w-full md:w-32 h-48 md:h-32 object-cover rounded-lg border"
      />

      <div className="flex-1">
        <h4 className="text-lg font-bold text-gray-800">{category.title}</h4>
        <p className="text-sm text-gray-600 mb-3">{category.description}</p>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleEditCategory(category.id)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded-lg transition"
          >
            ✏ Редактировать
          </button>
          <button
            onClick={() => setConfirmOpen(true)}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-lg transition"
          >
            ❌ Удалить
          </button>
        </div>
      </div>

      {confirmOpen && (
        <ConfirmOpen
          category={category}
          handleDeleteCategory={handleDeleteCategory}
          setConfirmOpen={setConfirmOpen}
        />
      )}
    </div>
  );
};

const ConfirmOpen = ({ category, handleDeleteCategory, setConfirmOpen }) => {
  const handleConfirmDelete = () => {
    handleDeleteCategory(category.id);
    setConfirmOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl shadow-lg w-80">
      <h3 className="text-lg font-bold mb-4">Удалить категорию?</h3>
      <p className="text-sm text-gray-700 mb-4">
        Вы уверены, что хотите удалить категорию <strong>{category.title}</strong>?
      </p>
      <div className="flex justify-end gap-2">
        <button
          onClick={() => setConfirmOpen(false)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 rounded transition"
        >
          ✖ Отмена
        </button>
        <button
          onClick={handleConfirmDelete}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded transition"
        >
          ❌ Удалить
        </button>
      </div>
    </div>
  </div>
  )
}
export default CategoryList;