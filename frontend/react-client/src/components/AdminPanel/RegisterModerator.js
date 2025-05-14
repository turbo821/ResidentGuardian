import { useState } from "react";
import api from "../../api";
import { isValidEmail } from "../../functions/textFunctions";
import { EyeOff, Eye } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';

const RegisterModerator = ({ setModerators }) => {
  const [moderatorFullName, setModeratorFullName] = useState("");
  const [moderatorEmail, setModeratorEmail] = useState("");
  const [moderatorPassword, setModeratorPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const fetchRegisterModerator = async (fullName, email, password) => {
    resetErrors();
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);

    try {
        const response = await api.post("/api/admin/moderators", { fullName, email, password });
        const newModerator = response.data;
        setModerators((prev) => [...prev, newModerator]);
        toast.success('Модератор успешно зарегистрирован', { duration: 2000 });
    } catch (error) {
        toast.error('Ошибка при регистрации модератора', { duration: 2000 });
        setErrors({general: "Такой пользователь уже существует"});
    }
    finally {
      setModeratorFullName("");
      setModeratorEmail("");
      setModeratorPassword("");
      setIsLoading(false);
    }
  };

    const validateForm = () => {
    const newErrors = {};
    if (!moderatorFullName) {
      newErrors.moderatorFullName = "Укажите имя!";
    }

    if(!moderatorEmail) {
      newErrors.moderatorEmail = "Укажите почту!";
    }
    if(moderatorEmail && !isValidEmail(moderatorEmail)) {
      newErrors.moderatorEmail = "Неверный формат почты!";
    }
    if(!moderatorPassword) {
      newErrors.moderatorPassword = "Введите пароль!";
    }
    if(moderatorPassword && moderatorPassword.length < 6) {
      newErrors.moderatorPassword = "Пароль слишком короткий!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetErrors = () => {
    setErrors({});
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md relative">
      <h3 className="text-xl font-bold text-gray-800">Регистрация модератора</h3>
      {errors.moderatorFullName && <p className="absolute top-9 mt-1 text-sm text-red-600">{errors.moderatorFullName}</p>}
      <input 
        type="text" 
        placeholder="Имя модератора" 
        value={moderatorFullName} 
        onChange={(e) => {
          setModeratorFullName(e.target.value);
          setErrors((prevErrors) => ({ ...prevErrors, moderatorFullName: "" }));
        }}
        className="w-full p-2 border rounded-lg mt-3"
      />

      {errors.moderatorEmail && <p className="absolute top-[5.5rem] mt-1 text-sm text-red-600">{errors.moderatorEmail}</p>}
      <input 
        type="email" 
        placeholder="Email модератора" 
        value={moderatorEmail} 
        onChange={(e) => {
          setModeratorEmail(e.target.value);
          setErrors((prevErrors) => ({ ...prevErrors, moderatorEmail: "" }));
        }}
        className="w-full p-2 border rounded-lg mt-3"
      />

      {errors.moderatorPassword && <p className="absolute bottom-28 mt-1 text-sm text-red-600">{errors.moderatorPassword}</p>}
      <input 
        type={showPassword ? "text" : "password"}
        placeholder="Пароль" 
        value={moderatorPassword} 
        onChange={(e) => {
          setModeratorPassword(e.target.value);
          setErrors((prevErrors) => ({ ...prevErrors, moderatorPassword: "" }));
        }}
        className="w-full p-2 border rounded-lg mt-3"
      />
      <button
        type="button"
        className="absolute bottom-[5.2rem] right-4 pr-3 flex items-center"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <EyeOff className="h-5 w-5 text-gray-400" />
        ) : (
          <Eye className="h-5 w-5 text-gray-400" />
        )}
      </button>

      {errors.general && <p className="absolute bottom-[3.5rem] text-sm text-red-600">{errors.general}</p>}
      <button 
        onClick={() => fetchRegisterModerator(moderatorFullName, moderatorEmail, moderatorPassword)} 
        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition mt-4"
      >
        {isLoading ? "Загрузка..." : "Зарегистрировать модератора"}
      </button>
      <Toaster/>
    </div>
    );
}

export default RegisterModerator;