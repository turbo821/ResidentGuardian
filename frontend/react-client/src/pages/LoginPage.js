import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { isValidEmail } from "../functions/textFunctions";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    resetErrors();
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await login(email, password);
      navigate(-1);
      toast.success("Вход успешно выполнен", { duration: 2000 });
    } catch (err) {
      toast.error("Неверный логин или пароль", { duration: 2000 });
      setErrors({general: "Неверный логин или пароль"});
    } finally {
      setIsLoading(false);
    }
  };
    
  const validateForm = () => {
    const newErrors = {};
    if(!email) {
      newErrors.email = "Укажите почту!";
    }
    if(email && !isValidEmail(email)) {
      newErrors.email = "Неверный формат почты!";
    }
    if(!password) {
      newErrors.password = "Введите пароль!";
    }
    if(password && password.length < 6) {
      newErrors.password = "Пароль слишком короткий!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetErrors = () => {
    setErrors({});
  };

  return (
    <div className="flex items-center justify-center min-h-[85vh] bg-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full relative">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-3">Вход</h2>
        <div className="mt-4">
          {errors.email && <p className="absolute top-14 mt-1 text-sm text-red-600">{errors.email}</p>}
          <input 
            type="email" 
            placeholder="Email"
            value={email} 
            onChange={(e) => {
              setEmail(e.target.value)
              setErrors((prevErrors) => ({ ...prevErrors, "email": "" }));
            }} 
            required 
            className="w-full p-3 border rounded-lg mb-7"
          />

          {errors.password && <p className="absolute top-[8.5rem] mt-1 text-sm text-red-600">{errors.password}</p>}
          <input 
            type={showPassword ? "text" : "password"}
            placeholder="Пароль" 
            value={password} 
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prevErrors) => ({ ...prevErrors, "password": "" }));
            }} 
            required 
            className="w-full p-3 border rounded-lg mb-8"
          />
          <button
            type="button"
            className="absolute top-44 right-9 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
          </button>
          {errors.general && <p className="absolute top-56 text-sm text-red-600">{errors.general}</p>}

          <button onClick={handleLogin} 
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition">
            {isLoading ? "Загрузка..." : "Войти"}
          </button>
        </div>
        <p className="mt-4 text-center">
          Нет аккаунта? <a href="/register" className="text-green-500 hover:underline">Регистрация</a>
        </p>
      </div>

    </div>
  );
};

export default LoginPage