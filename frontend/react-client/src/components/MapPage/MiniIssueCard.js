import viewStatus from "../../functions/viewStatus";
import { Link } from "react-router-dom";
import { imagesURL} from "../../api";

const MiniIssueCard = ({ issue }) => {
  return (
    <div key={issue.id} className="">
    <img 
      src={`${imagesURL}/${issue.image}`}
      alt={issue.image} 
      className="w-full h-40 object-cover" 
    />
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800">{issue.title}</h3>
      <p className="text-sm text-gray-600">{viewStatus(issue.status)}</p>
      <Link
        to={`/issues/${issue.id}`}
        className="text-green-500 hover:underline font-medium mt-2 block"
      >
        Подробнее →
      </Link>
    </div>
  </div>
  )
}

export default MiniIssueCard;