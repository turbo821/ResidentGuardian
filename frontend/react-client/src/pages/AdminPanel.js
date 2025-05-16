import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AssignModerator from "../components/AdminPanel/AssignModerator";
import AddCategory from "../components/AdminPanel/AddCategory";
import CategoryList from "../components/AdminPanel/CategoryList";
import { useAuth } from "../context/AuthContext";
import api from "../api";
import ModeratorList from "../components/AdminPanel/ModeratorList";
import RegisterModerator from "../components/AdminPanel/RegisterModerator";
import RevoredIssueList from "../components/AdminPanel/RevoredIssueList";

const AdminPanel = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [moderators, setModerators] = useState([]);
  const [revoredIssues, setRevoredIssues] = useState([]);
  const [activeTab, setActiveTab] = useState('moderators');

  useEffect(() => {
    fetchAllCategories(); 
    fetchAllModerators();
    fetchAllRevoredIssues();
  }, []);

  const fetchAllCategories = async() => {
    try {
      const response = await api.get("/api/categories");
      setCategories(response.data);
    }
    catch(err) {
      console.log(err.response);
    }
  }

  const fetchAllModerators = async() => {
    try {
      const response = await api.get("/api/admin/moderators");
      setModerators(response.data);
    }
    catch(err) {
      console.log(err.response);
    }
  }
  
  const fetchAllRevoredIssues = async() => {
    try {
      const response = await api.get("/api/issues/revored");
      setRevoredIssues(response.data.items);
    }
    catch(err) {
      console.log(err.response);
    }
  }
  useEffect(() => {
    if (!isLoading && (!user || !user.roles.includes("Admin"))) {
      navigate("/");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!user || !user.roles.includes("Admin")) {
    return null;
  }


  return (
    <div className="min-h-[90vh] bg-blue-100 flex flex-col items-center py-12 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-6xl w-full">
        <h2 className="text-4xl font-bold text-center text-gray-800">Панель администратора</h2>
        <p className="mt-2 text-lg text-center text-gray-700">
          Управляйте обращениями, категориями и назначайте модераторов.
        </p>

        <div className="flex border-b border-gray-200 mb-6 mt-6">
          <button
            onClick={() => setActiveTab('moderators')}
            className={`px-4 py-2 font-medium text-sm flex items-center gap-2 ${activeTab === 'moderators' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
            Управление модераторами
            <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded-full">
            </span>
          </button>
          
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2 font-medium text-sm flex items-center gap-2 ${activeTab === 'categories' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            Управление категориями
            <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded-full">
            </span>
          </button>

          <button
            onClick={() => setActiveTab('issues')}
            className={`px-4 py-2 font-medium text-sm flex items-center gap-2 ${activeTab === 'issues' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            Управление обращениями
            <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded-full">
            </span>
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {activeTab === "moderators" &&
            <>
              <AssignModerator setModerators={setModerators} categories={categories} />
              <RegisterModerator setModerators={setModerators} />
              <ModeratorList moderators={moderators} setModerators={setModerators} categories={categories} 
              />
            </>}

          {activeTab === "categories" && 
            <>
              <AddCategory setCategories={setCategories}/>
              <CategoryList categories={categories} setCategories={setCategories} />
            </>}

          {activeTab === "issues" &&
          <RevoredIssueList issues={revoredIssues} setIssues={setRevoredIssues} />}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
