import { useState, useRef } from "react";
import api from "../../api";
import UploadImage from "../UploadImage";
import toast from "react-hot-toast";

const AddCategory = ({ setCategories }) => {
  const fileInputRef = useRef(null);
  const [newCategory, setNewCategory] = useState({
    title: "",
    description: "",
    image: null
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleAddCategory = async() => {
    resetErrors();
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);

    try {
      const response = await api.post('/api/categories', newCategory, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const category = response.data;
      setCategories((prev) => [...prev, category]);
      toast.success("Категория успешно добавлена", { duration: 2000 });
    } catch (err) {
      toast.error("Ошибка при добавлении категории", { duration: 2000 });
      setErrors({general: "Произошла ошибка при создании категории"});
    }
    finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setNewCategory({
        title: "",
        description: "",
        image: null
      });
      setIsLoading(false);
    }
  };
  
  const handleImageUpload = (e) => {
    setNewCategory({...newCategory, image: e.target.files[0]});
    setErrors((prevErrors) => ({ ...prevErrors, image: "" }));
  };

  const removeImage = () => {
    setNewCategory({...newCategory, image: null});
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newCategory.title) {
      newErrors.title = "Укажите название!";
    }

    if (!newCategory.description) {
      newErrors.description = "Добавьте описание!";
    }

    if (!newCategory.image) {
      newErrors.image = "Прикрепите фото!"
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetErrors = () => {
    setErrors({});
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md md:col-span-2 relative">
      <h3 className="text-xl font-bold text-gray-800">Добавление категории</h3>

        {errors.title && <p className="absolute mt-0 text-sm text-red-600">{errors.title}</p>}
        <input 
          type="text" 
          placeholder="Название новой категории" 
          value={newCategory.title} 
          onChange={e => {
            setNewCategory({...newCategory, title: e.target.value});
            setErrors((prevErrors) => ({ ...prevErrors, title: "" }));
          }}
          className="w-full p-2 border rounded-lg mt-4"
        />

        {errors.description && <p className="absolute mt-0 text-sm text-red-600">{errors.description}</p>}
        <input 
          type="text" 
          placeholder="Описание новой категории" 
          value={newCategory.description} 
          onChange={e => {setNewCategory({...newCategory, description: e.target.value});
            setErrors((prevErrors) => ({ ...prevErrors, description: "" }));
          }}
          className="w-full p-2 border rounded-lg mt-4 mb-2"
        />
        {errors.image && <p className="absolute mt-0 left-28 text-sm text-red-600">{errors.image}</p>}
        <UploadImage 
          fileInputRef={fileInputRef} 
          handleImageUpload={handleImageUpload} 
          image={newCategory.image} 
          removeImage={removeImage} 
          multiple={false} 
        />

        {errors.general && <p className="absolute bottom-14 text-sm text-red-600">{errors.general}</p>}
        <button 
          onClick={handleAddCategory} 
          className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          { isLoading ? "Загрузка..." : "Добавить категорию" }
        </button>
    </div>
    );
}

export default AddCategory;