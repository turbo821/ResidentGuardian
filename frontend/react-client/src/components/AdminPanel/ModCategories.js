import { useState } from "react";
import toast from 'react-hot-toast';

const ModCategories = ({ moderator, categories = [], updateModCategories }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(moderator.moderatorCategories ?? []);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const toggleCategory = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
  };

  const handleAssignModerator = async(email, categoryIds) => {
    resetErrors();
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await updateModCategories(email, categoryIds);
      toast.success('Права модератора успешно обновлены', { duration: 2000 });
    } catch (error) {
      toast.error('Ошибка при обновлении прав', { duration: 2000 });
      setErrors({general: "Ошибка при назначении категорий"});
      setSelectedCategories(moderator.moderatorCategories ?? []);
    } finally {
      setIsLoading(false);
      setIsDropdownOpen(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if(selectedCategories.length === 0) {
      newErrors.selectedCategories = "Выберите категории!"
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetErrors = () => {
    setErrors({});
  };

  return (
    <div className="p-4 rounded-lg relative mt-4">
      {errors.selectedCategories && <p className="absolute mt-1 top-[-0.5rem] right-5 text-sm text-red-600">{errors.selectedCategories}</p>}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 rounded-lg flex justify-between items-center"
      >
        Категории
        <span>{isDropdownOpen ? "▲" : "▼"}</span>
      </button>

      {isDropdownOpen && (
        <div className="absolute left-0 w-full bg-white border rounded-lg mt-2 shadow-lg z-10">
          {(categories || []).map((cat) => (
            <label key={cat.id} className="block cursor-pointer p-2 hover:bg-gray-100 rounded-lg">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.id)}
                onChange={() => {
                  toggleCategory(cat.id)
                  setErrors((prevErrors) => ({ ...prevErrors, selectedCategories: "" }));
                }}
                className="mr-2"
              />
              {cat.title}
            </label>
          ))}
        </div>
      )}

      {errors.general && <p className="absolute mt-1 top-[-0.5rem] text-sm text-red-600">{errors.general}</p>}
      <div className="flex flex-row gap-1">
        <button
          onClick={() => handleAssignModerator(moderator.email, selectedCategories)}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-1 rounded-lg transition mt-2"
        >
          {isLoading ? "Загрузка..." : "Обновить права модератора" } 
        </button>
        <button 
          onClick={() => {
            setSelectedCategories(moderator.moderatorCategories ?? [])
            setErrors({});
          }} 
          className="w-1/8 bg-gray-300 hover:bg-gray-400 font-bold py-1 px-3 rounded-lg transition mt-2"
        >
          &lt;
        </button>
      </div>

    </div>
  );
}

export default ModCategories;