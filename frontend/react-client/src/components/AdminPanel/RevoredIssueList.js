import { useState } from "react";
import api from "../../api";
import toast from 'react-hot-toast';
import RevoredIssueCard from "./RevoredIssueCard";

const RevoredIssueList = ({ issues = [], setIssues }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [filter, setFilter] = useState('all');

  const handleDeleteIssue = async(id, softDeletion = false) => {
    try {
      await api.delete(`/api/issues/${id}?softDeletion=${softDeletion}`);
      toast.success("Обращение успешно удалено", { duration: 2000 });
      setIssues((prev) => prev.filter((cat) => cat.id !== id));
    }
    catch(err) {
      toast.error("Ошибка при удалении обращения", { duration: 2000 });
      console.log(err.response);
    }
  }

    const handleRestoreIssue = async(id) => {
    try {
      await api.patch(`/api/issues/${id}/restore`);
      toast.success("Обращение успешно восстановленно", { duration: 2000 });
      setIssues((prev) => prev.filter((cat) => cat.id !== id));
    }
    catch(err) {
      toast.error("Ошибка при восстановлении обращения", { duration: 2000 });
      console.log(err.response);
    }
  };

  const filteredIssues = issues.filter(issue => {
    if (filter === 'all') return true;
    if (filter === 'moderator') return !issue.selfDeleted;
    if (filter === 'user') return issue.selfDeleted;
    return true;
  });

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md md:col-span-2">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-xl font-bold text-gray-800">Список обращений на удаление</h3>
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
        <div className="mt-4">
          <div className="flex space-x-2 mb-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-md text-sm ${
                filter === 'all' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Все
            </button>
            <button
              onClick={() => setFilter('moderator')}
              className={`px-3 py-1 rounded-md text-sm ${
                filter === 'moderator' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Удаленные модератором
            </button>
            <button
              onClick={() => setFilter('user')}
              className={`px-3 py-1 rounded-md text-sm ${
                filter === 'user' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Удаленные пользователем
            </button>
          </div>

          <div className="grid gap-4">
            {filteredIssues.length > 0 ? filteredIssues.map((issue) => (
              <div key={issue.id} className="bg-white rounded-xl shadow-md p-4">
                <RevoredIssueCard 
                  issue={issue} 
                  handleDeleteIssue={handleDeleteIssue} 
                  handleRestoreIssue={handleRestoreIssue} 
                />
              </div>
            )) : <p className="text-gray-500">Нет обращений на удаление</p>}
          </div>
        </div>
      )}

    </div>
  );
}

export default RevoredIssueList;