
const SearchFilterPanel = ({ searchText, setSearchText, handleSearch, setShowFilters, showFilters }) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch gap-4 mt-6">
      <input
        type="text"
        placeholder="Введите текст для поиска..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={(e) => {
          e.preventDefault();
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