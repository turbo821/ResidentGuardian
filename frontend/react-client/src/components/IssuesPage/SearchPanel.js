import api from "../../api";

const SearchFilterPanel = ({ searchText, setIssues, setSearchText, setShowFilters, showFilters }) => {

  const handleSearch = async() => {
    const params = new URLSearchParams();

    if(!!searchText) {
      params.append("search", searchText);
    }
    
    try {
      const response = await api.get(`/api/issues?${params.toString()}`);
      setIssues(response.data);
    } catch(err) {
      console.log(err.response);
    }
  }
  return (
    <div className="flex flex-col sm:flex-row items-stretch gap-4 mt-6">
      <input
        type="text"
        placeholder="Введите текст для поиска..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        className="flex-1 p-3 border border-gray-300 rounded-lg w-full"
      />
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-lg transition"
      >
        🛠️ Фильтры
      </button>
    </div>
  )
};

export default SearchFilterPanel;