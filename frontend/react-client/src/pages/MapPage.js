// src/components/MapPage.js
import { Link } from 'react-router-dom';

const MapPage = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Карта проблем</h2>
      <div className="bg-gray-200 h-[400px] mb-4">Здесь будет карта</div>
      <Link to="/" className="text-[#6C7A89] hover:text-[#2D3436]">
        ← Вернуться на главную
      </Link>
    </div>
  );
};

export default MapPage;