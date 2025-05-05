import viewStatus from "../../functions/viewStatus";
import { Link } from "react-router-dom";
import { imagesURL} from "../../api";
import api from "../../api";
import { useState } from "react";

const MiniIssueCard = ({ issue, user }) => {
  const [likes, setLikes] = useState(issue?.likeCount || 0);
  const [dislikes, setDislikes] = useState(issue?.dislikeCount || 0);
  const [userVote, setUserVote] = useState(issue?.like || null);
  const id = issue.id;

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
    <div key={issue.id} className="">
    <img 
      src={`${imagesURL}/${issue.image}`}
      alt={issue.image} 
      className="w-full h-40 object-cover" 
    />
    <div className="p-4">
      <h3 className="text-md font-semibold text-gray-800">{issue.title}</h3>
      <p className="text-sm text-gray-600">{viewStatus(issue.status)}</p>
      <div className="flex flex-row justify-between items-start gap-4 mb-0">
        <div className="flex items-center gap-2">
          <Link
            to={`/issues/${issue.id}`}
            className="text-green-500 hover:underline font-medium mt-2 block"
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
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            <span>{likes}</span>
          </button>
          
          <button 
            onClick={handleDislike}
            className={`flex items-center gap-1 p-1 rounded-md transition ${userVote === false ? 'text-red-500 bg-red-50' : 'text-gray-500 hover:text-red-500'}`}
            aria-label="Dislike"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="size-4">
              <path stroke-linecap="round" stroke-linejoin="round" strokeWidth={2} d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54" />
            </svg>
            <span>{dislikes}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default MiniIssueCard;