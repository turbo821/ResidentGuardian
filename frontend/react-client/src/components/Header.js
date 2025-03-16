import { Link } from 'react-router-dom';

const Header = () => {
  return (
<header className="bg-gray-800 text-white">
  <div className="container mx-auto bg-gray-800 text-white p-4 flex justify-between items-center">
    <h1 className="text-xl font-bold">ResidentGuardian</h1>
    <nav>
      <ul className="flex space-x-4">
        <li><Link to="/" className="hover:text-green-400">Главная</Link></li>
        <li><Link to="/map" className="hover:text-green-400">Карта</Link></li>
        <li><Link to="/issues" className="hover:text-green-400">Темы</Link></li>
        <li><Link to="/report" className="hover:text-green-400">Сообщить</Link></li>
      </ul>
    </nav>
  </div>
</header>
  );
};

export default Header;

