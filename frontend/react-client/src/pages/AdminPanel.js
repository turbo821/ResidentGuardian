import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AssignModerator from "../components/AdminPanel/AssignModerator";
import AddModerator from "../components/AdminPanel/AddModerator";
import AddCategory from "../components/AdminPanel/AddCategory";
import CategoryList from "../components/AdminPanel/CategoryList";
import { useAuth } from "../context/AuthContext";
import api from "../api";

const AdminPanel = () => {
  // It is auth!!
  // const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchAllCategories(); 
  }, []);

  const fetchAllCategories = async() => {
    try {
      const response = await api.get("/api/categories");
      setCategories(response.data);
      console.log(response.data);
    }
    catch(err) {
      console.log(err.response);
    }
  }

  const addCategory = (category) => {
    setCategories((prev) => [...prev, category]);
  };
  
  // It is auth!!
  // useEffect(() => {
  //   if (!isLoading && (!user || !user.roles.includes("Admin"))) {
  //     navigate("/");
  //   }
  // }, [user, isLoading, navigate]);

  // if (isLoading) {
  //   return <div>Загрузка...</div>;
  // }

  // if (!user || !user.roles.includes("Admin")) {
  //   return null;
  // }


  return (
    <div className="min-h-[90vh] bg-blue-100 flex flex-col items-center py-12 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-6xl w-full">
        <h2 className="text-4xl font-bold text-center text-gray-800">Панель администратора</h2>
        <p className="mt-2 text-lg text-center text-gray-700">
          Управляйте категориями и назначайте модераторов.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <AssignModerator categories={categories}/>
          <AddModerator />
          <AddCategory add={addCategory}/>
          <CategoryList categories={categories} setCategories={setCategories} />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
