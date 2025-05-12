const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      
      {currentPage > 1 &&
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg ${
          'bg-white hover:bg-gray-200'
        }`}
      >
      Назад
      </button>}

      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-lg ${
            currentPage === page ? 'bg-green-500 text-white' : 'bg-white hover:bg-gray-200'
          }`}
        >
          {page}
        </button>
      ))}

      {currentPage < totalPages &&
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg ${
          'bg-white hover:bg-gray-200'
        }`}
      >
        Вперед
      </button>}
    </div>
  );
};

export default Pagination;