const ConfirmOpen = ({ itemTitle, item, handleDelete, setConfirmOpen }) => {
  const handleConfirmDelete = () => {
    handleDelete(item.id);
    setConfirmOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl shadow-lg w-80">
      <h3 className="text-lg font-bold mb-4">Удалить {itemTitle}?</h3>
      <p className="text-sm text-gray-700 mb-4">
        Вы уверены, что хотите удалить {itemTitle} <strong>{item.title}</strong>?
      </p>
      <div className="flex justify-end gap-2">
        <button
          onClick={() => setConfirmOpen(false)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 rounded transition"
        >
          ✖ Отмена
        </button>
        <button
          onClick={handleConfirmDelete}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded transition"
        >
          ❌ Удалить
        </button>
      </div>
    </div>
  </div>
  )
}

export default ConfirmOpen;