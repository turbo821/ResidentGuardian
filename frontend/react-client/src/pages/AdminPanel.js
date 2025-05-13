import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AssignModerator from "../components/AdminPanel/AssignModerator";
import AddCategory from "../components/AdminPanel/AddCategory";
import CategoryList from "../components/AdminPanel/CategoryList";
import { useAuth } from "../context/AuthContext";
import api from "../api";
import ModeratorList from "../components/AdminPanel/ModeratorList";
import RegisterModerator from "../components/AdminPanel/RegisterModerator";

const AdminPanel = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [moderators, setModerators] = useState([]);

  useEffect(() => {
    fetchAllCategories(); 
    fetchAllModerators();
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
          Управляйте категориями и назначайте модераторов.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <AssignModerator setModerators={setModerators} categories={categories} />
          <RegisterModerator setModerators={setModerators} />
          <ModeratorList moderators={moderators} setModerators={setModerators} categories={categories} 
          />

          <AddCategory setCategories={setCategories}/>
          <CategoryList categories={categories} setCategories={setCategories} />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
