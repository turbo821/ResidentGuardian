import { useState, useEffect } from "react";
import { useParams,  Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import IssueItem from "../components/ProfilePage/IssueItem";
import UserInfo from "../components/ProfilePage/UserInfo";

const ProfilePage = () => {
  const { id } = useParams();
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("ProfilePage effect:", { user, id, isLoading });
  
    if (isLoading) return;
  
    if (!user || id !== user.id.toString()) {
      navigate("/");
    }
  }, [user, id, isLoading, navigate]);

  if (isLoading) {
    return <div>Загрузка профиля...</div>;
  }

  return (
    <div className="min-h-[90vh] bg-blue-100 flex flex-col items-center py-12 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
        <h2 className="text-4xl font-bold text-center text-gray-800">Личный кабинет</h2>
        <p className="mt-2 text-lg text-center text-gray-700">
          Управляйте вашими данными и обращениями
        </p>

        <UserInfo user={user} />

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

        <div className="mt-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Ваши последние обращения</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <IssueItem item={item} key={item}/>
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