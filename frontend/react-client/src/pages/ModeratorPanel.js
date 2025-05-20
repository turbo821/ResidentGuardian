import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api";
import { useNavigate } from "react-router-dom";
import IssueItem from "../components/IssueItem";
import toast from "react-hot-toast";

const ModeratorPanel = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const [categories, setCategories] = useState(user?.moderatorCategories ?? []);
  const [activeTab, setActiveTab] = useState('pending');

  useEffect(() => {
    fetchModerIssues();
  }, []);

  useEffect(() => {
    if (user?.moderatorCategories) {
      setCategories(user.moderatorCategories);
    }
  }, [user?.moderatorCategories]);

  const fetchModerIssues = async() => {
    try {
      const response = await api.get("/api/moderation/issues");
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

  useEffect(() => {
    if (!isLoading && (!user || !user.roles.includes("Moderator"))) {
      navigate("/");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!user || !user.roles.includes("Moderator")) {
    return null;
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
      <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-6xl w-full">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">Панель модератора</h2>
        <p className="text-lg text-center text-gray-600 mb-8">Обрабатывайте обращения, раскрывая подробности</p>

        <div className="mb-10 bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Ваши категории</h3>
          {categories.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {categories.map(category => (
                <span 
                  key={category.id}
                  className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {category.title}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">У вас нет назначенных категорий</p>
          )}
        </div>

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
          {getActiveIssues().length > 0 ? (
            getActiveIssues().map(issue => <IssueItem issue={issue} key={issue.id} user={user} handleDeleteIssue={handleDeleteIssue} />)
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
              <p className="text-gray-500">
              {activeTab === 'all' && 'Нет обращений'}
                {activeTab === 'pending' && 'Нет новых обращений'}
                {activeTab === 'inProgress' && 'Нет обращений в обработке'}
                {activeTab === 'resolved' && 'Нет решенных обращений'}
                {activeTab === 'rejected' && 'Нет отклоненных обращений'}
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ModeratorPanel;
