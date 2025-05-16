import { useState } from "react";
import ConfirmDelete from "../ConfirmDelete";
import ModCategories from "./ModCategories";

const ModeratorCard = ({ moderator, categories, handleDeleteModerator, unassignModerator, updateModCategories }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row items-center justify-around gap-1 p-4 border rounded-xl shadow-sm bg-white">
      <div className="flex flex-col">
        <h4 className="text-md font-bold text-gray-800">Имя: {moderator.fullName}</h4>
        <p className="text-md font-bold text-gray-700">Почта: {moderator.email}</p>
      </div>
      <div className="flex flex-col">
        <ModCategories categories={categories} moderator={moderator} updateModCategories={updateModCategories} />
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <button
            onClick={() => unassignModerator(moderator.id)}
            className=" bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded-lg transition"
          >
            Снять модератора
        </button>
        <button
            onClick={() => setConfirmOpen(true)}
            className=" bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-lg transition"
          >
            Удалить профиль
        </button>
      </div>

      {confirmOpen && (
        <ConfirmDelete
          itemTitle={"модератора"}
          item={moderator}
          handleDelete={handleDeleteModerator}
          setConfirmOpen={setConfirmOpen}
        />
      )}
    </div>
  );
}

export default ModeratorCard;