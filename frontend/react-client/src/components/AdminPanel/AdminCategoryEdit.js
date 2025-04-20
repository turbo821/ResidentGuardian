const AdminCategoryEdit = ({ editCategory, setEditCategory, handleSaveCategory }) => {

  const handleCancel = () => {
    setEditCategory(null);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <input
        type="text"
        value={editCategory.title}
        onChange={(e) => setEditCategory({ ...editCategory, title: e.target.value })}
        className="w-full p-2 border rounded-lg"
      />
      <input
        type="text"
        value={editCategory.description}
        onChange={(e) => setEditCategory({ ...editCategory, description: e.target.value })}
        className="w-full p-2 border rounded-lg"
      />
      <label className="block text-gray-700 font-bold">Выбор картинки:</label>
      <input 
        type="file" 
        accept="image/*"
        onChange={e => setEditCategory({...editCategory, image: e.target.files[0]})} 
        className="block text-gray-700 font-bold p-2 mb-3"
      />
      <div className="flex gap-2 justify-around ">
        <button
          onClick={handleSaveCategory}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded transition w-full"
        >
          Сохранить
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 rounded transition w-full"
        >
          ✖ Отменить
        </button>
      </div>
  </div>
  )
};

export default AdminCategoryEdit;