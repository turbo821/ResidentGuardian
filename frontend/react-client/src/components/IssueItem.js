import { Link } from "react-router-dom";
import IssueStatus from "./ProfilePage/IssueStatus";
import api from "../api";
import { useState } from "react";
import ConfirmDelete from "./ConfirmDelete";

const IssueItem = ({ issue, user, handleDeleteIssue, isCurrentUser = false }) => {
  const createdDate = (new Date(issue?.createdAt)).toLocaleDateString();

  const [likes, setLikes] = useState(issue?.likeCount || 0);
  const [dislikes, setDislikes] = useState(issue?.dislikeCount || 0);
  const [userVote, setUserVote] = useState(issue?.like);
  const [confirmDeleted, setConfirmDeleted] = useState(false);
  const id = issue.id;
  const isModerator = user?.roles?.includes("Moderator") && user.moderatorCategories.some(
    (moderatorCategory) => moderatorCategory?.title === issue?.category
  );
  const isAdmin = user?.roles?.includes("Admin");

  const handleLike = async() => {
    if (!user) return;

    if (userVote === true) {
      setLikes(prev => prev - 1);
      setUserVote(null);
      await deleteGrade(id);
    } else {
      setLikes(prev => prev + 1);
      if (userVote === false) {
        setDislikes(prev => prev - 1);
        await deleteGrade(id);
      }
      setUserVote(true);
      await addGrade(id, true);
    }
  };

  const handleDislike = async() => {
    if (!user) return;

    if (userVote === false) {
      setDislikes(prev => prev - 1);
      setUserVote(null);
      await deleteGrade(id);
    } else {
      setDislikes(prev => prev + 1);
      if (userVote === true) {
        setLikes(prev => prev - 1);
        await deleteGrade(id);
      }
      setUserVote(false);
      await addGrade(id, false);
    }
  };

    const addGrade = async(id, grade) => {
      try {
        await api.post(`/api/issues/${id}/grades`, grade, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } catch(err) {
        console.log(err.response);
      }
    }

  const deleteGrade = async(id) => {
    try {
      await api.delete(`/api/issues/${id}/grades`);
    } catch(err) {
      console.log(err.response);
    }
  }

  return (
    <div key={issue.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition relative group">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-bold text-lg">{issue.title}</h4>
          <p className="text-gray-600 text-sm mt-1">{issue.location}</p>
          <p className="text-gray-600 text-sm">Создано: {createdDate}</p>
        </div>
        <IssueStatus issue={issue} />
      </div>

      <div className="flex flex-row justify-between items-start gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Link 
              to={`/issues/${issue.id}`} 
              className="inline-block mt-3 text-blue-500 hover:underline font-medium"
            >
              Подробнее →
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleLike}
              className={`flex items-center gap-1 p-1 rounded-md transition ${userVote === true ? 'text-green-500 bg-green-50' : 'text-gray-500 hover:text-green-500'}`}
              aria-label="Like"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              <span>{likes}</span>
            </button>
            
            <button 
              onClick={handleDislike}
              className={`flex items-center gap-1 p-1 rounded-md transition ${userVote === false ? 'text-red-500 bg-red-50' : 'text-gray-500 hover:text-red-500'}`}
              aria-label="Dislike"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" strokeWidth={2} d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54" />
              </svg>
              <span>{dislikes}</span>
            </button>
          </div>
          {(isAdmin || isModerator || isCurrentUser) && 
          <button
            onClick={() => setConfirmDeleted(true)}
            className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity absolute right-0 top-0"
            title="Удалить обращение"
            aria-label="Удалить"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>}
          {isCurrentUser && (
            <Link
              to={`/issues/${issue.id}/edit`}
              className="text-blue-500 hover:text-blue-700 opacity-0 group-hover:opacity-100 transition-opacity absolute right-0 bottom-0"
              title="Редактировать обращение"
              aria-label="Редактировать"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </Link>
          )}
          {(isAdmin || isModerator || isCurrentUser) && confirmDeleted && 
            <ConfirmDelete
              itemTitle={"обращение"}
              item={issue}
              handleDelete={handleDeleteIssue}
              setConfirmOpen={setConfirmDeleted}
            />
          }

        </div>
    </div>
  )
};

export default IssueItem;