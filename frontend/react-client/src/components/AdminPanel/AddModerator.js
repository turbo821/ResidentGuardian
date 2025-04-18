import React, { useState } from "react";
import api from "../../api";
import { useCallback } from "react";

const AddModerator = () => {
  const [isNewModerator, setIsNewModerator] = useState(false);
  const [moderatorFullName, setModeratorFullName] = useState("");
  const [moderatorEmail, setModeratorEmail] = useState("");
  const [moderatorPassword, setModeratorPassword] = useState("");

  const handleRegisterModerator = async() => {
    if (isNewModerator) {
      await fetchRegisterModerator(moderatorFullName, moderatorEmail, moderatorPassword);
    } else {
      alert(`Пользователь ${moderatorEmail} теперь модератор`);
    }
    setModeratorFullName("");
    setModeratorEmail("");
    setModeratorPassword("");
  };
  
  const fetchRegisterModerator = useCallback(async (fullName, email, password) => {
    try {
        const response = await api.post("/api/auth/register-moderator-role", { fullName, email, password });
        console.log(response.data);
    } catch (error) {
        console.error("Register error: ", error.response);
    }
  }, []);

  const fetchAssignModeratorrole = useCallback(async (email) => {
    try {
      const response = await api.post("/api/auth/add-moderator-role", email);
      console.log(response.data);
    } catch (error) {
      console.error("Assign moderator role error: ", error.response);
    }
  })

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-gray-800">Добавление модератора</h3>

      <div className="flex items-center mt-4">
        <label className="mr-3 text-gray-700 font-medium">Регистрация нового</label>
        <input 
          type="checkbox" 
          checked={isNewModerator} 
          onChange={() => setIsNewModerator(!isNewModerator)} 
          className="w-5 h-5 cursor-pointer"
        />
      </div>

      {isNewModerator && (
        <input 
          type="text" 
          placeholder="ФИО модератора" 
          value={moderatorFullName} 
          onChange={(e) => setModeratorFullName(e.target.value)} 
          className="w-full p-2 border rounded-lg mt-4"
        />
      )}

      <input 
        type="email" 
        placeholder="Email модератора" 
        value={moderatorEmail} 
        onChange={(e) => setModeratorEmail(e.target.value)} 
        className="w-full p-2 border rounded-lg mt-4"
      />

      {isNewModerator && (
        <input 
          type="password" 
          placeholder="Пароль" 
          value={moderatorPassword} 
          onChange={(e) => setModeratorPassword(e.target.value)} 
          className="w-full p-2 border rounded-lg mt-3"
        />
      )}

      <button 
        onClick={handleRegisterModerator} 
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition mt-4"
      >
        {isNewModerator ? "Зарегистрировать модератора" : "Назначить модератором"}
      </button>
    </div>
    );
}

export default AddModerator;