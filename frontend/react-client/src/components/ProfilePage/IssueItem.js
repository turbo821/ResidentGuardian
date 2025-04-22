import { Link } from "react-router-dom";
import viewStatus from "../../functions/viewStatus";

const IssueItem = ({ issue }) => {
  const createdDate = (new Date(issue?.createdAt)).toLocaleDateString();

  return (
    <div key={issue.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition">
    <div className="flex justify-between items-start">
      <div>
        <h4 className="font-bold text-lg">{issue.title}</h4>
        <p className="text-gray-600 text-sm mt-1">{issue.location}</p>
        <p className="text-gray-600 text-sm">Создано: {createdDate}</p>
      </div>
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
        issue.status === 0 
          ? "bg-green-100 text-green-800" 
          : issue.status === 1 
            ? "bg-yellow-100 text-yellow-800" 
            : issue.status === 2 
              ? "bg-blue-100 text-blue-800"
              : "bg-red-100 text-red-800"
      }`}>
        {viewStatus(issue.status)}
      </span>
    </div>
    <Link 
      to={`/issues/${issue.id}`} 
      className="inline-block mt-3 text-blue-500 hover:underline font-medium"
    >
      Подробнее →
    </Link>
  </div>
  )
};

export default IssueItem;