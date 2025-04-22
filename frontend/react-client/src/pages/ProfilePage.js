import { useState, useEffect } from "react";
import { useParams,  Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import IssueItem from "../components/ProfilePage/IssueItem";
import UserInfo from "../components/ProfilePage/UserInfo";
import api from "../api";

const ProfilePage = () => {
  const { id } = useParams();
  const { user, isLoading } = useAuth();
  const [issues, setIssues] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    if (isLoading) return;
  
    if (!user || id !== user.id.toString()) {
      navigate("/");
    }
  }, [user, id, isLoading, navigate]);

  useEffect(() => {
    fetchUserIssues(); 
  }, []);

  const fetchUserIssues = async() => {
    try {
      const response = await api.get("/api/user/issues");
      setIssues(response.data);
    }
    catch(err) {
      console.log(err.response);
    }
  }

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
            <p className="text-3xl font-bold mt-2 text-green-600">{issues?.length}</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg shadow-sm">
            <h4 className="font-bold text-gray-800">В процессе</h4>
            <p className="text-3xl font-bold mt-2 text-yellow-600">{issues ? issues.filter(issue => issue.status === 1).length : 0}</p>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg shadow-sm">
            <h4 className="font-bold text-gray-800">Решённые проблемы</h4>
            <p className="text-3xl font-bold mt-2 text-blue-600">{issues ? issues.filter(issue => issue.status === 2).length : 0}</p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Ваши последние обращения</h3>
          <div className="space-y-4">
            {issues ? issues.map((issue) => (
              <IssueItem issue={issue} key={issue.id}/>
            ))
          : <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
              <h4 className="text-lg">Вы пока ни создали ни одного обращения</h4>
            </div>}
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