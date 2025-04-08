import { Link } from "react-router-dom";

const IssueCard = ({ issue }) => {
  return (
    <div key={issue.id} className="bg-white shadow-md rounded-xl overflow-hidden border">
    <img src={issue.image} alt={issue.title} className="w-full h-40 object-cover" />
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800">{issue.title}</h3>
      <p className="text-sm text-gray-600">{issue.status}</p>
      <Link
        to={`/issues/${issue.id}`}
        className="text-green-500 hover:underline font-medium mt-2 block"
      >
        Подробнее →
      </Link>
    </div>
  </div>
  )
};

export default IssueCard;