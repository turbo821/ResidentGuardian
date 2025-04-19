import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img 
              src="/problem-icon.png" 
              className="w-10 h-10 lg:w-12 lg:h-12 object-contain" 
              alt="Логотип"
            />
            <h1 className="text-lg lg:text-xl font-bold whitespace-nowrap">ResidentGuardian</h1>
          </div>

          <button 
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-label="Меню"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <div className="flex flex-wrap justify-center gap-1 xl:gap-2">
              <NavLink to="/">Главная</NavLink>
              <NavLink to="/issues">Обращения</NavLink>
              <NavLink to="/map">Карта</NavLink>
              <NavLink to="/report">Сообщить</NavLink>
              <NavLink to="/categories">Категории</NavLink>
              <NavLink to="/about">О портале</NavLink>
              
              {user?.roles.includes('Admin') && (
                <NavLink to="/admin" className="bg-blue-600 hover:bg-blue-500">
                  Админ
                </NavLink>
              )}
              {user?.roles.includes('Moderator') && (
                <NavLink to="/moderator" className="bg-blue-600 hover:bg-blue-500">
                  Модератор
                </NavLink>
              )}
            </div>

            <div className="flex items-center ml-2 pl-2 border-l border-blue-500">
              {user ? (
                <>
                  <NavLink to={`/profile/${user.id}`} className="min-w-max">
                    Профиль
                  </NavLink>
                  <button 
                    onClick={handleLogout} 
                    className="px-3 py-1 rounded hover:bg-blue-500 transition whitespace-nowrap text-sm xl:text-base"
                  >
                    Выход
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/login">Вход</NavLink>
                  <NavLink to="/register">
                    Регистрация
                  </NavLink>
                </>
              )}
            </div>
          </nav>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4">
            <MobileNav user={user} handleLogout={handleLogout} toggleMenu={toggleMenu} />
          </div>
        )}
      </div>
    </header>
  );
};

const NavLink = ({ to, children, className = '', ...props }) => (
  <Link
    to={to}
    className={`px-3 py-1 rounded hover:bg-blue-500 transition whitespace-nowrap text-sm xl:text-base ${className}`}
    {...props}
  >
    {children}
  </Link>
);

const MobileNav = ({ user, handleLogout, toggleMenu }) => (
  <div className="flex flex-col space-y-3">
    <Link to="/" onClick={toggleMenu} className="px-3 py-2 rounded hover:bg-blue-500 transition">Главная</Link>
    <Link to="/issues" onClick={toggleMenu} className="px-3 py-2 rounded hover:bg-blue-500 transition">Обращения</Link>
    <Link to="/map" onClick={toggleMenu} className="px-3 py-2 rounded hover:bg-blue-500 transition">Карта</Link>
    <Link to="/report" onClick={toggleMenu} className="px-3 py-2 rounded hover:bg-blue-500 transition">Сообщить</Link>
    <Link to="/categories" onClick={toggleMenu} className="px-3 py-2 rounded hover:bg-blue-500 transition">Категории</Link>
    <Link to="/about" onClick={toggleMenu} className="px-3 py-2 rounded hover:bg-blue-500 transition">О портале</Link>

    <div className="border-t border-blue-500 pt-3 mt-2">
      {user?.roles.includes('Admin') && (
        <Link to="/admin" onClick={toggleMenu} className="block px-3 py-2 rounded hover:bg-blue-500 transition">
          Админ
        </Link>
      )}
      {user?.roles.includes('Moderator') && (
        <Link to="/moderator" onClick={toggleMenu} className="block px-3 py-2 rounded hover:bg-blue-500 transition">
          Модератор
        </Link>
      )}
      
      {user ? (
        <>
          <Link to={`/profile/${user.id}`} onClick={toggleMenu} className="block px-3 py-2 rounded hover:bg-blue-500 transition">
            Профиль
          </Link>
          <button 
            onClick={() => {
              handleLogout();
              toggleMenu();
            }} 
            className="w-full text-left px-3 py-2 rounded hover:bg-blue-500 transition"
          >
            Выход
          </button>
        </>
      ) : (
        <>
          <Link to="/login" onClick={toggleMenu} className="block px-3 py-2 rounded hover:bg-blue-500 transition">
            Вход
          </Link>
          <Link to="/register" onClick={toggleMenu} className="block px-3 py-2 rounded hover:bg-blue-500 transition">
            Регистрация
          </Link>
        </>
      )}
    </div>
  </div>
);

export default Header;