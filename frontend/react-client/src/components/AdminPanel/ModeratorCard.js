import { useState } from "react";
import ConfirmOpen from "./ConfirmOpen";

const ModeratorCard = ({ moderator, categories, handleDeleteModerator, unassignModerator }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row items-center justify-around gap-4 p-4 border rounded-xl shadow-sm bg-white">
      <div className="flex flex-col">
        <h4 className="text-md font-bold text-gray-800">ФИО: {moderator.fullName}</h4>
        <p className="text-md font-bold text-gray-700">Почта: {moderator.email}</p>
      </div>
      <div className="flex flex-col">
        {moderator?.moderatorCategories !== null && moderator?.moderatorCategories.length > 0 ? (
          moderator.moderatorCategories.map(catId => (
            <p className="text-gray-700" key={catId}> {categories.find(c => c.id === catId)?.title} </p>
          ))
        ) : (
          <span className="text-gray-700">Категории не назначены</span>
        )}
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
        <ConfirmOpen
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