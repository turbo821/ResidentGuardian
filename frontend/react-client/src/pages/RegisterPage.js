import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { isValidEmail } from "../functions/textFunctions";
import { Eye, EyeOff } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const RegisterPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    resetErrors();
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      await register(fullName, email, password);
      // toast.success("Пользователь успешно зарегистрирован", { duration: 2000 });
      navigate(-1);
    } catch (err) {
      toast.error("Такой пользователь уже существует", { duration: 2000 });
      setErrors({general: "Такой пользователь уже существует"});
    } finally {
      setPassword("");
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!fullName) {
      newErrors.fullName = "Укажите ваше имя!";
    }

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
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Регистрация</h2>
        <div className="mt-4">

          {errors.fullName && <p className="absolute top-16 mt-1 text-sm text-red-600">{errors.fullName}</p>}
          <input 
            type="text" 
            placeholder="Имя" 
            value={fullName} 
            onChange={(e) => {
              setFullName(e.target.value)
              setErrors((prevErrors) => ({ ...prevErrors, fullName: "" }));
            }} 
            required 
            className="w-full p-3 border rounded-lg mb-7"
          />

          {errors.email && <p className="absolute top-36 mt-1 text-sm text-red-600">{errors.email}</p>}
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => {
              setEmail(e.target.value)
              setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
            }} 
            required 
            className="w-full p-3 border rounded-lg mb-7"
          />

          {errors.password && <p className="absolute top-56 mt-1 text-sm text-red-600">{errors.password}</p>}
          <input 
            type={showPassword ? "text" : "password"}
            placeholder="Пароль" 
            value={password} 
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
            }} 
            required 
            className="w-full p-3 border rounded-lg mb-8"
          />
          <button
            type="button"
            className="absolute top-[16.5rem] right-9 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
          </button>
          {errors.general && <p className="absolute top-[19rem] text-sm text-red-600">{errors.general}</p>}

          <button onClick={handleRegister} 
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition">
            {isLoading ? "Загрузка..." : "Зарегистрироваться"}
          </button>
        </div>
        <p className="mt-4 text-center">
          Уже есть аккаунт? <a href="/login" className="text-green-500 hover:underline">Войти</a>
        </p>
      </div>
      <Toaster/>
    </div>
  );
};

export default RegisterPage;