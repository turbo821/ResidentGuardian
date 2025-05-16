import { useState } from "react";
import { imagesURL } from "../../api";
import ConfirmDelete from "../ConfirmDelete";
import viewStatus from "../../functions/viewStatus";
import { Link } from "react-router-dom";

const RevoredIssueCard = ({ issue, handleDeleteIssue, handleRestoreIssue }) => {
    const [confirmDeleted, setConfirmDeleted] = useState(false);

  return (
    <div className="flex flex-col md:flex-row items-start gap-4 p-4 border rounded-xl shadow-sm bg-white">
      <img
        src={`${imagesURL}/${issue.image}`}
        alt={issue.image}
        className="w-full md:w-32 h-48 md:h-32 object-cover rounded-lg border"
      />

      <div className="flex-1">
        <h4 className="text-lg font-bold text-gray-800 mb-3">{issue.title}</h4>
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <span className={`inline-block w-3 h-3 rounded-full ${
              issue.status === 0 
                ? "bg-green-500" 
                : issue.status === 1 
                  ? "bg-yellow-500" 
                  : issue.status === 2 
                    ? "bg-blue-500"
                    : "bg-red-500"
            }`}></span>
            <p className="text-gray-700"><strong>Статус:</strong> {viewStatus(issue.status)}</p>
          </div>
            
          <p className="text-gray-700  mb-3"><strong>Категория:</strong> {issue.category}</p>
        </div>

        <div className="flex flex-wrap gap-2 ">
          <Link
            to={`/issues/${issue.id}`}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded-lg transition"
          >
            Подробнее →
          </Link>
          <button
            onClick={() => handleRestoreIssue(issue.id)}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded-lg transition"
          >
            ✏ Восстановить
          </button>
          <button
            onClick={() => setConfirmDeleted(true)}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-lg transition"
          >
            ❌ Удалить
          </button>
        </div>
      </div>

      {confirmDeleted && (
        <ConfirmDelete
          itemTitle={"обращение"}
          item={issue}
          handleDelete={handleDeleteIssue}
          setConfirmOpen={setConfirmDeleted}
        />
      )}
    </div>
  );
}

export default RevoredIssueCard;