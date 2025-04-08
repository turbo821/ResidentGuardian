import { useState, useEffect } from "react";
import { useParams,  Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  // It is auth!!!
  // useEffect(() => {
  //   if(!user || id !== user.id) {
  //     navigate("/");
  //   }
  // }, []);


  return (
    <div className="min-h-[90vh] bg-blue-100 flex flex-col items-center py-12 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
        <h2 className="text-4xl font-bold text-center text-gray-800">Личный кабинет</h2>
        <p className="mt-2 text-lg text-center text-gray-700">
          Управляйте вашими данными и обращениями
        </p>

        {/* Основная информация пользователя */}
        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-800">{user?.email}</h3>
              <p className="text-gray-600 mt-1">
                Статус: <span className="font-semibold text-green-600">Активный</span>
              </p>
              <p className="text-gray-600">
                Дата регистрации: <span className="font-semibold">01.01.2023</span>
              </p>
            </div>
          </div>
        </div>

        {/* Статистика пользователя */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-green-100 p-4 rounded-lg shadow-sm">
            <h4 className="font-bold text-gray-800">Отправлено обращений</h4>
            <p className="text-3xl font-bold mt-2 text-green-600">12</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
            <h4 className="font-bold text-gray-800">Решённые проблемы</h4>
            <p className="text-3xl font-bold mt-2 text-blue-600">8</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg shadow-sm">
            <h4 className="font-bold text-gray-800">В процессе</h4>
            <p className="text-3xl font-bold mt-2 text-yellow-600">4</p>
          </div>
        </div>

        {/* Последние обращения */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Ваши последние обращения</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-lg">Яма на дороге #{item}</h4>
                    <p className="text-gray-600 text-sm mt-1">ул. Ленина, д. {10 + item}</p>
                    <p className="text-gray-600 text-sm">Создано: 15.0{item}.2023</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    item % 3 === 0 
                      ? "bg-green-100 text-green-800" 
                      : item % 2 === 0 
                        ? "bg-yellow-100 text-yellow-800" 
                        : "bg-red-100 text-red-800"
                  }`}>
                    {item % 3 === 0 ? "Решено" : item % 2 === 0 ? "В работе" : "На модерации"}
                  </span>
                </div>
                <Link 
                  to={`/issues/${item}`} 
                  className="inline-block mt-3 text-blue-500 hover:underline font-medium"
                >
                  Подробнее →
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link 
              to="/issues" 
              className="text-blue-500 hover:underline font-bold"
            >
              Показать все обращения
            </Link>
          </div>
        </div>

        {/* Действия */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link 
            to="/report" 
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition text-center"
          >
            Создать новое обращение
          </Link>
          <Link 
            to="/settings" 
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition text-center"
          >
            Настройки профиля
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;