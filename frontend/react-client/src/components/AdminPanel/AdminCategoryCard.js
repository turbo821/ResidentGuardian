import { useState } from "react";
import { imagesURL } from "../../api";
import ConfirmDelete from "../ConfirmDelete";

const AdminCategoryCard = ({ category, categories, setEditCategory, handleDeleteCategory }) => {
  const [confirmDeleted, setConfirmDeleted] = useState(false);

  const handleEditCategory = (id) => {
    setEditCategory(categories.find((cat) => cat.id === id));
  };

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
            onClick={() => setConfirmDeleted(true)}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-lg transition"
          >
            ❌ Удалить
          </button>
        </div>
      </div>

      {confirmDeleted && (
        <ConfirmDelete
          itemTitle={"категорию"}
          item={category}
          handleDelete={handleDeleteCategory}
          setConfirmOpen={setConfirmDeleted}
        />
      )}
    </div>
  );
};

export default AdminCategoryCard;