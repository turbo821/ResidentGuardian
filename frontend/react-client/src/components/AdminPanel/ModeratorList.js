import { useState } from "react";
import api from "../../api";
import ModeratorCard from "./ModeratorCard";
import toast from 'react-hot-toast';

const ModeratorList = ({ moderators, setModerators, categories }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const fetchUnassignModerator = async(id) => {
    try {
      await api.delete(`/api/admin/unassign-moderator/${id}`);
      setModerators((prev) => prev.filter((mod) => mod.id !== id));
      toast.success("Модератор снят с должности", { duration: 2000 });
    } catch(err) {
      toast.error("Ошибка при попытке снять модератора с должности", { duration: 2000 });
      console.log(err.response);
    }
  }

  const fetchDeleteModerator = async(id) => {
    try {
      await api.delete(`/api/admin/moderators/${id}`);
      toast.success("Модератор успешно удален", { duration: 2000 });
    }
    catch(err) {
      toast.error("Ошибка при удалении модератора", { duration: 2000 });
      console.log(err.response);
    }

    setModerators(moderators.filter((mod) => mod.id !== id));
  };

  const fetchUpdateModeratorCategories = async(email, categoryIds) => {
    try {
      const response = await api.put('/api/admin/moderator-categories', {
        email: email,
        categoryIds: categoryIds
      });
      const updateModerator = response.data;
      setModerators(moderators.map((mod) => (mod.id === updateModerator.id ? updateModerator : mod)));
    } catch(err) {
      console.log(err.response);
      throw err;
    }
  }

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md md:col-span-2">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-xl font-bold text-gray-800">Список модераторов</h3>
        <svg
          className={`w-5 h-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {isExpanded && (
        <div className="mt-4 grid gap-4">
          {moderators.length > 0 ? moderators.map((mod) => (
            <div key={mod.id} className="bg-white rounded-xl shadow-md p-4">
              <ModeratorCard
                moderator={mod}
                categories={categories}
                handleDeleteModerator={fetchDeleteModerator}
                unassignModerator={fetchUnassignModerator}
                updateModCategories={fetchUpdateModeratorCategories}
              />
            </div>
          )) 
          : <p className="text-gray-500 mt-2">Модераторов нет</p>}
        </div>
      )}
    </div>
  );
}

export default ModeratorList;