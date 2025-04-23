import viewStatus from "../../functions/viewStatus";

const IssueStatus = ({ issue, className }) => {
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
      issue.status === 0 
        ? "bg-green-100 text-green-800" 
        : issue.status === 1 
          ? "bg-yellow-100 text-yellow-800" 
          : issue.status === 2 
            ? "bg-blue-100 text-blue-800"
            : "bg-red-100 text-red-800"
    } ${className}`}>
      {viewStatus(issue.status)}
    </span>
  )
}

export default IssueStatus;