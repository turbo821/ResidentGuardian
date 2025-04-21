import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchFilterPanel from "../components/IssuesPage/SearchPanel";
import Filters from "../components/IssuesPage/Filters";
import IssueCard from "../components/IssuesPage/IssueCard";
import api from "../api";

const IssuesPage = () => {
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const [timeRange, setTimeRange] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetchAllIssues(); 
  }, []);

  const fetchAllIssues = async() => {
    try {
      const response = await api.get("/api/issues");
      setIssues(response.data);
    }
    catch(err) {
      console.log(err.response);
    }
  }

  const handleReset = () => {
    setStatus("all");
    setCategory("all");
    setTimeRange("all");
  };

  const handleSearch = () => {
    console.log({
      searchText,
      status,
      category,
      timeRange,
    });
    alert("Поиск выполнен. (Заглушка)");
  };

  const handleApply = () => {
    console.log({ searchText, status, category, timeRange });
    alert("Фильтры применены (заглушка)");
  };

  const filteredIssues = issues.filter((issue) => {
    const matchesSearch = issue.title.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = status === "all" || issue.status === status;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-[90vh] bg-blue-100 flex flex-col items-center py-10 px-4">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-7xl">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">Каталог обращений</h2>
        <p className="text-lg text-center text-gray-700 mb-8">
          Ознакомьтесь с проблемами, о которых сообщили жители.
        </p>

        <SearchFilterPanel
          searchText={searchText}
          setSearchText={setSearchText}
          handleSearch={handleSearch}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
        />
        
        {showFilters && (
          <Filters
            status={status}
            setStatus={setStatus}
            category={category}
            setCategory={setCategory}
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            handleApply={handleApply}
            handleReset={handleReset}
          />
        )}
        
        <div className="mt-6 text-gray-700 font-semibold text-center">
          Найдено обращений: {filteredIssues.length}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {issues.length > 0 ? issues.map((issue) => (
            <IssueCard issue={issue} key={issue.id} />
          )) 
          : 
          <div className="text-center text-gray-700 text-xl">Обращения не найдено.</div>}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/report"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition"
          >
            + Создать обращение
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IssuesPage;
