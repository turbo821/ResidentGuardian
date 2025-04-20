import React, { useState } from "react";
import api from "../../api";
import ModeratorCard from "./ModeratorCard";

const ModeratorList = ({ moderators, setModerators }) => {

  const unassignModerator = async(id) => {
    try {
      await api.delete(`/api/moderation/unassign-moderator/${id}`);
      setModerators((prev) => prev.filter((mod) => mod.id !== id));
    } catch(err) {
      console.log(err.response);
    }
  }

  const handleDeleteModerator = async(id) => {
    try {
      await api.delete(`/api/moderation/${id}`);
    }
    catch(err) {
      console.log(err.response);
    }

    setModerators(moderators.filter((mod) => mod.id !== id));
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md md:col-span-2">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Список модераторов</h3>

      <div className="grid gap-4">
        {moderators.length > 0 ? moderators.map((mod) => (
          <div key={mod.id} className="bg-white rounded-xl shadow-md p-4">
            <ModeratorCard
                moderator={mod}
                handleDeleteModerator={handleDeleteModerator}
                unassignModerator={unassignModerator}
            />
          </div>
        )) 
        : <p>Модераторов нет</p>}
      </div>
    </div>
  );
}

export default ModeratorList;