import React, { useState } from "react";

const AddModerator = () => {
  const [isNewModerator, setIsNewModerator] = useState(false);
  const [moderatorEmail, setModeratorEmail] = useState("");
  const [moderatorPassword, setModeratorPassword] = useState("");

  const handleRegisterModerator = () => {
    if (isNewModerator) {
      alert(`Регистрация нового модератора: ${moderatorEmail}, пароль: ${moderatorPassword}`);
    } else {
      alert(`Пользователь ${moderatorEmail} теперь модератор`);
    }
    setModeratorEmail("");
    setModeratorPassword("");
  };
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