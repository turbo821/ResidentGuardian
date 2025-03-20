import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useAuth();
  
    const handleRegister = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fullName, email, password })
        });
        const data = await response.json();
        if (!data.success) throw new Error(data.message);
        login(data.token);
        navigate("/dashboard");
      } catch (err) {
        setError(err.message);
      }
    };
  
    return (
      <div className="flex items-center justify-center min-h-[85vh] bg-blue-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-3xl font-bold text-center text-gray-800">Регистрация</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleRegister} className="mt-4">
            <input 
              type="text" 
              placeholder="ФИО" 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)} 
              required 
              className="w-full p-3 border rounded-lg mb-3"
            />
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="w-full p-3 border rounded-lg mb-3"
            />
            <input 
              type="password" 
              placeholder="Пароль" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="w-full p-3 border rounded-lg mb-3"
            />
            <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition">
              Зарегистрироваться
            </button>
          </form>
          <p className="mt-4 text-center">
            Уже есть аккаунт? <a href="/login" className="text-green-500 hover:underline">Войти</a>
          </p>
        </div>
      </div>
    );
  };

export default RegisterPage;