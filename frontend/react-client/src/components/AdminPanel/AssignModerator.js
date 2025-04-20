import React, { useState } from "react";
import api from "../../api";

const AssignModerator = ({ categories = [], setModerators }) => {
  const [moderatorEmail, setModeratorEmail] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleCategory = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
  };

  const handleAssignModerator = async(email, categoryIds) => {
    try {
      const response = await api.post('/api/moderation/categories', {
        email: email,
        categoryIds: categoryIds
      });
      const updateModerator = response.data;
      setModerators((prev) => prev.map((mod) => (mod.id === updateModerator.id ? updateModerator : mod)));
    } catch (error) {
      console.error('Error assigning categories:', error);
    }
    setModeratorEmail("");
    setSelectedCategories([]);
    setIsDropdownOpen(false);
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-gray-800">Назначение модераторов</h3>

      <div className="mt-4">
        <input
          type="email"
          placeholder="Email модератора"
          value={moderatorEmail}
          onChange={(e) => setModeratorEmail(e.target.value)}
          className="w-full p-2 border rounded-lg mb-3"
        />

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

        <button
          onClick={() => handleAssignModerator(moderatorEmail, selectedCategories)}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition mt-4"
        >
          Обновить права модератора
        </button>
      </div>
    </div>
  );
}

export default AssignModerator;