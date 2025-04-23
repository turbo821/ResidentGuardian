import { Link } from "react-router-dom";
import IssueStatus from "./IssueStatus";

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
      <IssueStatus issue={issue} />
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