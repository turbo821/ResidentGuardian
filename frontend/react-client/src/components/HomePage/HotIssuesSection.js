import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import IssueCard from "../IssuesPage/IssueCard";
import { useAuth } from "../../context/AuthContext";

const   HotIssuesSection = () => {
  const { user } = useAuth();
  const [issues, setIssues] = useState([]);
  const PAGE_SIZE = 3;
  // const SORT_BY_RATING = 2;
  const SORT_NEWEST = 0;

  useEffect(() => {
    fetchHotIssues(); 
  }, []);

  const fetchHotIssues = async() => {
    try {
      const response = await api.get(`/api/issues?pageSize=${PAGE_SIZE}&sortOrder=${SORT_NEWEST}`);
      setIssues(response.data.items);
    }
    catch(err) {
      console.log(err.response);
    }
  }

  return (
          <section className="container mx-auto px-4 py-16 space-y-16">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-left">Актуальные проблемные темы</h2>
            <p className="mt-2 text-lg text-left">
              Ознакомьтесь с последними проблемами, затронувшими город.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {issues && issues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} user={user} />
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

export default HotIssuesSection;