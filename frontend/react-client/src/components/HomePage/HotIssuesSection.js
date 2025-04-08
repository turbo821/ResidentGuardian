import { Link } from "react-router-dom";

const HotIssuesSection = ({ issues }) => {
  return (
          <section className="container mx-auto px-4 py-16 space-y-16">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-left">Актуальные проблемные темы</h2>
            <p className="mt-2 text-lg text-left">
              Ознакомьтесь с последними проблемами, затронувшими город.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {issues.map((issue) => (
              <IssueCard issue={issue} />
            ))}
          </div>
  
          <div className="mt-6 text-left">
            <Link to="/issues" className="text-green-500 hover:underline font-bold text-lg">
              Смотреть все темы
            </Link>
          </div>
        </section>
  )
};

const IssueCard = ({ issue }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img src={issue.image} alt={issue.title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{issue.title}</h3>
      </div>
    </div>
  )
};

export default HotIssuesSection;