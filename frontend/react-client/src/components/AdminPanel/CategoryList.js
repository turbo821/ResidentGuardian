import { useState } from "react";
import api from "../../api";
import AdminCategoryEdit from "./AdminCategoryEdit";
import AdminCategoryCard from "./AdminCategoryCard";
import toast, { Toaster } from 'react-hot-toast';

const CategoryList = ({ categories = [], setCategories }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [editCategory, setEditCategory] = useState(null);

  const handleDeleteCategory = async(id) => {
    try {
      await api.delete(`/api/categories/${id}`);
      toast.success("Категория успешно удалена", { duration: 2000 });
    }
    catch(err) {
      toast.error("Ошибка при удалении категории", { duration: 2000 });
      console.log(err.response);
    }
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };
  
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md md:col-span-2">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-xl font-bold text-gray-800">Список категорий</h3>
        <svg
          className={`w-5 h-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {isExpanded && (
        <div className="mt-4 grid gap-4">
          {categories.length > 0 ? categories.map((cat) => (
            <div key={cat.id} className="bg-white rounded-xl shadow-md p-4">
              {editCategory && editCategory.id === cat.id ? (
                <AdminCategoryEdit
                  editCategory={editCategory}
                  setEditCategory={setEditCategory}
                  categories={categories}
                  setCategories={setCategories}
                />
              ) : (
                <AdminCategoryCard
                  category={cat}
                  handleDeleteCategory={handleDeleteCategory}
                  categories={categories}
                  setEditCategory={setEditCategory}
                />
              )}
            </div>
          )) 
          : <p>Категорий нет</p>}
        </div>
      )}
      <Toaster/>
    </div>
  );
}

export default CategoryList;