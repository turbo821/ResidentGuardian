import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchFilterPanel from "../components/IssuesPage/SearchPanel";
import Filters from "../components/IssuesPage/Filters";
import IssueCard from "../components/IssuesPage/IssueCard";
import Pagination from "../components/IssuesPage/Pagination";
import api from "../api";
import getTimeRange from "../functions/getDates";
import { useAuth } from "../context/AuthContext";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
const IssuesPage = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const [showFilters, setShowFilters] = useState(false);
  const [issues, setIssues] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(searchParams.get('pageNumber') || 1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchText, setSearchText] = useState(searchParams.get('search') || "");
  const [selectCategoryId, setSelectCategoryId] = useState(searchParams.get('categoryId') || "99");
  const [selectStatus, setSelectStatus] = useState(searchParams.get('status') || "99");
  const [timeRange, setTimeRange] = useState(searchParams.get('date') || "all");
  const [sortBy, setSortBy] = useState(searchParams.get('sortOrder') || 2);

  const PAGE_SIZE=8;

  useEffect(() => {
    handleFilterApply(currentPage); 
  }, []);

  const handlePageChange = async(page) => {
    setCurrentPage(page);
    setSearchParams({...searchParams, pageNumber: page});
    await handleFilterApply(page);
  };

  const handleFilterApply = async(page) => {
    const params = new URLSearchParams();

    if(selectCategoryId !== "99" && selectCategoryId !== "98") {
      params.append("categoryId", selectCategoryId);
    }
    
    if(selectStatus !== "99" && selectStatus !== "98") {
      params.append("status", selectStatus);
    }

    if(!!searchText) {
      params.append("search", searchText);
    }
    
    params.append("sortOrder", sortBy);
    params.append("pageNumber", page);
    params.append("date", timeRange);

    setSearchParams(params);

    if(timeRange && timeRange !== "all") {
      const range = getTimeRange(timeRange);
      if(range) {
        params.append("startDate", range[0]);
        params.append("endDate", range[1]);
      }
    }

    params.append("pageSize", PAGE_SIZE);

    try {
      const response = await api.get(`/api/issues?${params.toString()}`);
      setIssues(response.data.items);
      setTotalCount(response.data.totalItems);
      setTotalPages(response.data.totalPages);

    } catch(err) {
      console.log(err.response);
    }
  }

  const handleFilterReset = async() => {
    try {
      setCurrentPage(1);
      const response = await api.get(`/api/issues?pageSize=${PAGE_SIZE}`);
      setIssues(response.data.items);
      setTotalCount(response.data.totalItems);
      setTotalPages(response.data.totalPages);
      setSearchParams({});
    } catch(err) {
      console.log(err.response);

    } finally {
      setSelectCategoryId("99");
      setSelectStatus("99");
      setTimeRange("all");
      setSearchText("");
      setSortBy(2);
    }
  }

  const handleDeleteIssue = async(id, softDeletion = true) => {
    try {
      await api.delete(`/api/issues/${id}?softDeletion=${softDeletion}`);
      toast.success("Обращение успешно удалено", { duration: 2000 });
      await handleFilterApply(currentPage);
    }
    catch(err) {
      toast.error("Ошибка при удалении обращения", { duration: 2000 });
      console.log(err.response);
    }
  }

  return (
    <div className="min-h-[90vh] bg-blue-100 flex flex-col items-center py-10 px-4">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-7xl">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">Каталог обращений</h2>
        <p className="text-lg text-center text-gray-700 mb-8">
          Ознакомьтесь с проблемами, о которых сообщили жители.
        </p>

        <SearchFilterPanel
          searchText={searchText}
          setIssues={setIssues}
          setSearchText={setSearchText}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
        />
        
        {showFilters && (
          <Filters
          selectCategoryId={selectCategoryId}
          setSelectCategoryId={setSelectCategoryId}
          selectStatus={selectStatus}
          setSelectStatus={setSelectStatus}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
          sortBy={sortBy}
          setSortBy={setSortBy}
          handleApply={handleFilterApply}
          handleReset={handleFilterReset}
          currentPage={currentPage}
          />
        )}
        
        <div className="my-3 text-gray-700 font-semibold text-center">
          Найдено обращений: {totalCount}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {issues && issues.length > 0 ? issues.map((issue) => (
            <IssueCard issue={issue} key={issue.id} user={user} handleDeleteIssue={handleDeleteIssue} />
          )) 
          : 
          <div className="text-center text-gray-700 text-xl">Обращения не найдены.</div>}
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

      {issues && issues.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

    </div>
  );
};

export default IssuesPage;
