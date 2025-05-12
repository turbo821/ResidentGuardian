import React, { useState } from "react";
import api from "../../api";
import { isValidEmail } from "../../functions/textFunctions";

const AssignModerator = ({ categories = [], setModerators }) => {
  const [moderatorEmail, setModeratorEmail] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
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
      const response = await api.post('/api/admin/moderator-categories', {
        email: email,
        categoryIds: categoryIds
      });
      const updateModerator = response.data;
      setModerators((prev) => prev.map((mod) => (mod.id === updateModerator.id ? updateModerator : mod)));
    } catch (error) {
      setErrors({general: "Такого модератора не существует"});
    } finally {
      setIsLoading(false);
      setModeratorEmail("");
      setSelectedCategories([]);
      setIsDropdownOpen(false);
    }
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
      newErrors.selectedCategories = "Выберите категории!"
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetErrors = () => {
    setErrors({});
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md relative h-[225px]">
      <h3 className="text-xl font-bold text-gray-800">Назначение модераторов</h3>

      <div className="mt-4">
        {errors.moderatorEmail && <p className="absolute mt-1 top-10 text-sm text-red-600">{errors.moderatorEmail}</p>}
        <input
          type="email"
          placeholder="Email модератора"
          value={moderatorEmail}
          onChange={(e) => setModeratorEmail(e.target.value)}
          className="w-full p-2 border rounded-lg mb-3"
        />
        {errors.selectedCategories && <p className="absolute mt-1 top-10 right-5 text-sm text-red-600">{errors.selectedCategories}</p>}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg flex justify-between items-center"
          >
            Выбрать категории
            <span>{isDropdownOpen ? "▲" : "▼"}</span>
          </button>

          {isDropdownOpen && (
            <div className="absolute left-0 w-full bg-white border rounded-lg mt-2 shadow-lg p-2 z-10">
              {(categories || []).map((cat) => (
                <label key={cat.id} className="block cursor-pointer p-2 hover:bg-gray-100 rounded-lg">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.id)}
                    onChange={() => toggleCategory(cat.id)}
                    className="mr-2"
                  />
                  {cat.title}
                </label>
              ))}
            </div>
          )}
        </div>

        {errors.general && <p className="absolute mt-1 bottom-[3.5rem] text-sm text-red-600">{errors.general}</p>}
        <button
          onClick={() => handleAssignModerator(moderatorEmail, selectedCategories)}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition mt-4"
        >
          {isLoading ? "Загрузка..." : "Обновить права модератора" } 
        </button>
      </div>
    </div>
  );
}

export default AssignModerator;