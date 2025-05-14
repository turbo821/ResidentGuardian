import api from "../../api";
import { useState, useRef } from "react";
import UploadImage from "../UploadImage";
import toast, { Toaster } from "react-hot-toast";

const AdminCategoryEdit = ({ editCategory, setEditCategory, categories, setCategories }) => {
  const fileInputRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleCancel = () => {
    setEditCategory(null);
  };

  const handleSaveCategory = async () => {
    resetErrors();
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);

    try {
      const response = await api.put("/api/categories", editCategory, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const updateCategory = response.data;
      setCategories(categories.map((cat) => (cat.id === updateCategory.id ? updateCategory : cat)));
      toast.success("Категория успешно обновлена", { duration: 2000 });
    } catch(err) {
      toast.error("Ошибка при обновлении категории", { duration: 2000 });
      console.log('Ошибка загрузки: ' + err.response?.data || err.message);
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setEditCategory(null);
      setIsLoading(false);
    }
  }

    const handleImageUpload = (e) => {
    setEditCategory({...editCategory, image: e.target.files[0]});
  };

  const removeImage = () => {
    setEditCategory({...editCategory, image: null});
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!editCategory.title) {
      newErrors.title = "Укажите название!";
    }

    if (!editCategory.description) {
      newErrors.description = "Добавьте описание!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetErrors = () => {
    setErrors({});
  };

  return (
    <div className="p-4 rounded-lg md:col-span-2 relative">
      <h3 className="text-xl font-bold text-gray-800">Редактирование категории</h3>

      {errors.title && <p className="absolute mt-0 text-sm text-red-600">{errors.title}</p>}
      <input
        type="text"
        value={editCategory.title}
        onChange={(e) => {
          setEditCategory({ ...editCategory, title: e.target.value });
          setErrors((prevErrors) => ({ ...prevErrors, title: "" }));
        }}
        className="w-full p-2 border rounded-lg mt-4"
      />

      {errors.description && <p className="absolute mt-0 text-sm text-red-600">{errors.description}</p>}
      <input
        type="text"
        value={editCategory.description}
        onChange={(e) => {
          setEditCategory({ ...editCategory, description: e.target.value });
          setErrors((prevErrors) => ({ ...prevErrors, description: "" }));
        }}
        className="w-full p-2 border rounded-lg mt-4 mb-2"
      />

      <UploadImage 
        fileInputRef={fileInputRef} 
        handleImageUpload={handleImageUpload} 
        image={editCategory.image} 
        removeImage={removeImage} 
        multiple={false} 
      />

      {errors.general && <p className="absolute bottom-14 text-sm text-red-600">{errors.general}</p>}
      <div className="flex gap-2 justify-around ">
        <button
          onClick={handleSaveCategory}
          className="mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded transition w-full"
        >
          { isLoading ? "Загрузка..." : "Редактировать" }
        </button>
        <button
          onClick={handleCancel}
          className="mt-6 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 rounded transition w-full"
        >
          ✖ Отменить
        </button>
      </div>
      <Toaster/>
    </div>
  )
};

export default AdminCategoryEdit;