import React, { useState } from "react";
import api from "../../api";

const RegisterModerator = ({ setModerators }) => {
  const [moderatorFullName, setModeratorFullName] = useState("");
  const [moderatorEmail, setModeratorEmail] = useState("");
  const [moderatorPassword, setModeratorPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchRegisterModerator = async (fullName, email, password) => {
    setIsLoading(true);
    try {
        const response = await api.post("/api/admin/moderators", { fullName, email, password });
        const newModerator = response.data;
        setModerators((prev) => [...prev, newModerator]);
    } catch (error) {
        console.error("Register error: ", error.response);
    }
    finally {
      setModeratorFullName("");
      setModeratorEmail("");
      setModeratorPassword("");
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-gray-800">Регистрация модератора</h3>
      <input 
        type="text" 
        placeholder="Имя модератора" 
        value={moderatorFullName} 
        onChange={(e) => setModeratorFullName(e.target.value)} 
        className="w-full p-2 border rounded-lg mt-4"
      />
      <input 
        type="email" 
        placeholder="Email модератора" 
        value={moderatorEmail} 
        onChange={(e) => setModeratorEmail(e.target.value)} 
        className="w-full p-2 border rounded-lg mt-4"
      />
      <input 
        type="password" 
        placeholder="Пароль" 
        value={moderatorPassword} 
        onChange={(e) => setModeratorPassword(e.target.value)} 
        className="w-full p-2 border rounded-lg mt-3"
      />

      <button 
        onClick={() => fetchRegisterModerator(moderatorFullName, moderatorEmail, moderatorPassword)} 
        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition mt-4"
      >
        {isLoading ? "Загрузка..." : "Зарегистрировать модератора"}
      </button>
    </div>
    );
}

export default RegisterModerator;