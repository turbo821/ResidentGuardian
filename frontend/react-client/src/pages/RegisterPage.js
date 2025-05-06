import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { register } = useAuth();
  
    const handleRegister = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setError(null);
      
      try {
        await register(fullName, email, password);
        navigate("/");
        } catch (err) {
            setError(err.response?.data || "Registration failed");
        } finally {
            setIsLoading(false);
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
              placeholder="Имя" 
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
              {isLoading ? "Загрузка..." : "Зарегистрироваться"}
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