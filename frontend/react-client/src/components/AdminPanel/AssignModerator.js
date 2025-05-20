import { useState } from "react";
import api from "../../api";
import { isValidEmail } from "../../functions/textFunctions";
import toast from 'react-hot-toast';

const AssignModerator = ({ categories, setModerators }) => {
  const [moderatorEmail, setModeratorEmail] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchAssignModerator = async (email, categories) => {
    resetErrors();
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);

    try {
      const data = {
        email: email,
        CategoryIds: categories
      }
      const response = await api.post("/api/admin/assign-moderator", data);
      const newModerator = response.data;
      setModerators((prev) => [...prev, newModerator]);
      toast.success('Модератор успешно назначен', { duration: 2000 });
    } catch (error) {
      toast.error('Ошибка при назначении модератора', { duration: 2000 });
      setErrors({general: "Такой пользователь не найден"});
    }
    finally {
      setModeratorEmail("");
      setSelectedCategories([]);
      setIsLoading(false);
    }
  };

  const toggleCategory = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
  };

  const validateForm = () => {
    const newErrors = {};
    if(!moderatorEmail) {
      newErrors.moderatorEmail = "Укажите почту!";
    }
    if(moderatorEmail && !isValidEmail(moderatorEmail)) {
      newErrors.moderatorEmail = "Неверный формат почты!";
    }
    if(selectedCategories.length === 0) {
      newErrors.selectedCategories = "Назначьте категории!"
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetErrors = () => {
    setErrors({});
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md relative">
      <h3 className="text-xl font-bold text-gray-800">Назначение модератора</h3>

      {errors.moderatorEmail && <p className="absolute top-10 mt-1 text-sm text-red-600">{errors.moderatorEmail}</p>}
      <input 
        type="email" 
        placeholder="Email пользователя" 
        value={moderatorEmail} 
        onChange={(e) => {
          setModeratorEmail(e.target.value);
          setErrors((prevErrors) => ({ ...prevErrors, moderatorEmail: "" }));
        }}
        className="w-full p-2 border rounded-lg mt-5"
      />

      {errors.selectedCategories && <p className="absolute top-[6.3rem] mt-1 text-sm text-red-600">{errors.selectedCategories}</p>}
      <button
        onClick={() => {
          setIsDropdownOpen(!isDropdownOpen);
        }}
        className="mt-5 w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg flex justify-between items-center"
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

      {errors.general && <p className="absolute bottom-14 mt-1 text-sm text-red-600">{errors.general}</p>}
      <button 
        onClick={() => fetchAssignModerator(moderatorEmail, selectedCategories)} 
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition mt-5"
      >
        {isLoading ? "Загрузка..." : "Назначить модератором"}
      </button>
    </div>
    );
}

export default AssignModerator;