// src/components/IssuesPage.js
import { Link } from 'react-router-dom';

const IssuesPage = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Все проблемные темы</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Здесь будет список всех тем */}
        <div className="bg-white p-4 shadow">Тема 1</div>
        <div className="bg-white p-4 shadow">Тема 2</div>
      </div>
      <Link to="/" className="text-[#6C7A89] hover:text-[#2D3436] mt-4 block">
        ← Вернуться на главную
      </Link>
    </div>
  );
};

export default IssuesPage;