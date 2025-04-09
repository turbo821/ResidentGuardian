
const ModeratorIssue = ({ issue, handleStatusChange, handlePhotoUpload, handleResponseChange, setModalImage, handleSave }) => {

  return (
    <div className="p-4 border-t border-gray-200 space-y-4 bg-white rounded-b-xl">
    <p><span className="font-semibold">Адрес:</span> {issue.location}</p>
    <p><span className="font-semibold">Описание:</span> {issue.description}</p>

    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
      <div className="flex flex-col gap-2 w-full md:w-1/2">
        <label className="font-semibold">Статус:</label>
        <select
          value={issue.status}
          onChange={(e) => handleStatusChange(issue.id, e.target.value)}
          className="p-2 border rounded-lg bg-white"
        >
          <option value="В обработке">В обработке</option>
          <option value="Выполнено">Выполнено</option>
          <option value="Отклонено">Отклонено</option>
        </select>
      </div>

      <div className="flex flex-col gap-2 w-full md:w-1/2">
        <label className="font-semibold">Добавить фото:</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handlePhotoUpload(issue.id, e.target.files)}
          className="p-2 border rounded-lg bg-white"
        />
      </div>
    </div>

    <div className="flex flex-col gap-2">
      <label className="font-semibold">Ответ:</label>
      <textarea
        value={issue.response}
        onChange={(e) => handleResponseChange(issue.id, e.target.value)}
        placeholder="Ответ по обращению"
        className="w-full p-3 border rounded-lg resize-none h-28"
      />
    </div>

    {issue.photos.length > 0 && (
      <div>
        <p className="font-semibold mb-2">Фото после изменений:</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {issue.photos.map((file, index) => (
            <img
              key={index}
              src={URL.createObjectURL(file)}
              alt={`report-${index}`}
              className="w-full h-32 object-cover rounded-lg border shadow cursor-pointer"
              onClick={() => setModalImage(URL.createObjectURL(file))}
            />
          ))}
        </div>
      </div>
    )}

    <div className="flex justify-end">
      <button
        onClick={() => handleSave(issue.id)}
        className="mt-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition"
      >
        Сохранить
      </button>
    </div>
  </div>
  )
}

export default ModeratorIssue;