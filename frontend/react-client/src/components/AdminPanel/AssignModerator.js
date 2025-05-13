import React, { useState } from "react";
import api from "../../api";

const AssignModerator = ({ categories, setModerators }) => {
  const [moderatorEmail, setModeratorEmail] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchAssignModerator = async (email, categories) => {

    setIsLoading(true);
    try {
      const data = {
        email: email,
        CategoryIds: categories
      }
      const response = await api.post("/api/admin/assign-moderator", data);
      const newModerator = response.data;
      setModerators((prev) => [...prev, newModerator]);
    } catch (error) {
      console.error("Assign moderator role error: ", error.response);
    }
    finally {
      setModeratorEmail("");
      setIsLoading(false);
    }
  };

  const toggleCategory = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md relative">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Назначение модератора</h3>

      <input 
        type="email" 
        placeholder="Email пользователя" 
        value={moderatorEmail} 
        onChange={(e) => setModeratorEmail(e.target.value)} 
        className="w-full p-2 border rounded-lg mb-3"
      />

      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg flex justify-between items-center"
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


      <button 
        onClick={() => fetchAssignModerator(moderatorEmail, selectedCategories)} 
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition mt-4"
      >
        {isLoading ? "Загрузка..." : "Назначить модератором"}
      </button>
    </div>
    );
}

export default AssignModerator;