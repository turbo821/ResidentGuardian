import { useState, useEffect } from "react";
import { useParams,  Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import IssueItem from "../components/IssueItem";
import UserInfo from "../components/ProfilePage/UserInfo";
import api from "../api";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { id } = useParams();
  const { user, isLoading } = useAuth();
  const [issues, setIssues] = useState([]);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pending');

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

  const handleDeleteIssue = async(id) => {
    const softDeletion = true;
    try {
      await api.delete(`/api/issues/${id}?softDeletion=${softDeletion}`);
      toast.success("Обращение успешно удалено", { duration: 2000 });
      setIssues((prev) => prev.filter((cat) => cat.id !== id));
    }
    catch(err) {
      toast.error("Ошибка при удалении обращения", { duration: 2000 });
      console.log(err.response);
    }
  }

  if (isLoading) {
    return <div>Загрузка профиля...</div>;
  }

  const pendingIssues = issues ? issues.filter(issue => issue.status === 0) : [];
  const inProgressIssues = issues ? issues.filter(issue => issue.status === 1) : [];
  const resolvedIssues = issues ? issues.filter(issue => issue.status === 2) : [];
  const rejectedIssues = issues ? issues.filter(issue => issue.status === 3) : [];

  const getActiveIssues = () => {
    switch(activeTab) {
      case 'all': return issues;
      case 'pending': return pendingIssues;
      case 'inProgress': return inProgressIssues;
      case 'resolved': return resolvedIssues;
      case 'rejected': return rejectedIssues;
      default: return pendingIssues;
    }
  };

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
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Ваши обращения</h3>
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-4 py-2 font-medium text-sm flex items-center gap-2 ${activeTab === 'pending' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              На рассмотрении
              <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded-full">
                {pendingIssues.length}
              </span>
            </button>
            
            <button
              onClick={() => setActiveTab('inProgress')}
              className={`px-4 py-2 font-medium text-sm flex items-center gap-2 ${activeTab === 'inProgress' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              В работе
              <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded-full">
                {inProgressIssues.length}
              </span>
            </button>
            
            <button
              onClick={() => setActiveTab('resolved')}
              className={`px-4 py-2 font-medium text-sm flex items-center gap-2 ${activeTab === 'resolved' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Решено
              <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded-full">
                {resolvedIssues.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('rejected')}
              className={`px-4 py-2 font-medium text-sm flex items-center gap-2 ${activeTab === 'rejected' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              Отклонено
              <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded-full">
                {rejectedIssues.length}
              </span>
            </button>

            <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 font-medium text-sm flex items-center gap-2 ${activeTab === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
              Все
              <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded-full">
                {issues.length}
              </span>
            </button>
          </div>
          
          <div className="space-y-4">
            {getActiveIssues().length > 0 ? getActiveIssues().map((issue) => (
              <IssueItem issue={issue} key={issue.id} user={user} handleDeleteIssue={handleDeleteIssue} isCurrentUser={true}/>
            ))
          : <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
              <h4 className="text-lg">Здесь нет ваших обращений</h4>
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