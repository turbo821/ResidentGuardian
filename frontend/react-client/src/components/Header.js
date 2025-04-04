import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async() => {
    await logout();
    navigate("/login");
  }

  return (
    <header className="bg-blue-500 text-white">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <img src="/problem-icon.png" style={{width: "50px"}}/>
          <h1 className="text-xl font-bold">ResidentGuardian</h1>
          <nav className="flex space-x-4">
            <Link to="/" className="hover:text-green-400">Главная</Link>
            <Link to="/issues" className="hover:text-green-400">Обращения</Link>
            <Link to="/map" className="hover:text-green-400">Карта</Link>
            <Link to="/report" className="hover:text-green-400">Сообщить о проблеме</Link>
            <Link to="/categoryy" className="hover:text-green-400">Категории</Link>
            <Link to="/about" className="hover:text-green-400">О портале</Link>
          </nav>
        </div>

        <nav className="flex space-x-4">
          {user ? (
            <>
              <Link to={`/profile/${user.id}`} className="hover:text-green-400">Личный кабинет</Link>
              <button onClick={handleLogout} className="hover:text-green-400">Выход</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-green-400">Вход</Link>
              <Link to="/register" className="hover:text-green-400">Регистрация</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;