import React, { useState } from "react";

const ModeratorPanel = () => {
  const [reports, setReports] = useState([
    {
      id: 1,
      title: "Яма на дороге",
      description: "Огромная яма на перекрестке улиц Ленина и Пушкина",
      category: "Дорожные проблемы",
      location: "ул. Ленина и Пушкина",
      status: "В обработке",
      photos: [],
      response: "",
    },
  ]);

  const [openId, setOpenId] = useState(null);
  const [modalImage, setModalImage] = useState(null);

  const toggleOpen = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const handleResponseChange = (id, value) => {
    setReports(prev =>
      prev.map(r => r.id === id ? { ...r, response: value } : r)
    );
  };

  const handleStatusChange = (id, value) => {
    setReports(prev =>
      prev.map(r => r.id === id ? { ...r, status: value } : r)
    );
  };

  const handlePhotoUpload = (id, files) => {
    const uploaded = Array.from(files);
    setReports(prev =>
      prev.map(r =>
        r.id === id ? { ...r, photos: [...r.photos, ...uploaded] } : r
      )
    );
  };

  const handleSave = (id) => {
    const report = reports.find(r => r.id === id);
    console.log("Сохранено обращение:", report);
    alert("Ответ отправлен и статус обновлён.");
  };

  return (
    <div className="min-h-[90vh] bg-blue-100 flex flex-col items-center py-12 px-4">
      <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-6xl w-full">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">Панель модератора</h2>
        <p className="text-lg text-center text-gray-600 mb-8">Обрабатывайте обращения, раскрывая подробности</p>

        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="bg-gray-50 rounded-xl border border-gray-200 shadow transition"
            >
              {/* Заголовок */}
              <button
                onClick={() => toggleOpen(report.id)}
                className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-100 transition"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{report.title}</h3>
                  <p className="text-gray-600">{report.category}</p>
                </div>
                <span className="text-2xl text-gray-400">{openId === report.id ? "−" : "+"}</span>
              </button>

              {/* Раскрытая часть */}
              {openId === report.id && (
                <div className="p-4 border-t border-gray-200 space-y-4 bg-white rounded-b-xl">
                  <p><span className="font-semibold">Адрес:</span> {report.location}</p>
                  <p><span className="font-semibold">Описание:</span> {report.description}</p>

                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div className="flex flex-col gap-2 w-full md:w-1/2">
                      <label className="font-semibold">Статус:</label>
                      <select
                        value={report.status}
                        onChange={(e) => handleStatusChange(report.id, e.target.value)}
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
                        onChange={(e) => handlePhotoUpload(report.id, e.target.files)}
                        className="p-2 border rounded-lg bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Ответ:</label>
                    <textarea
                      value={report.response}
                      onChange={(e) => handleResponseChange(report.id, e.target.value)}
                      placeholder="Ответ по обращению"
                      className="w-full p-3 border rounded-lg resize-none h-28"
                    />
                  </div>

                  {report.photos.length > 0 && (
                    <div>
                      <p className="font-semibold mb-2">Фото после изменений:</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {report.photos.map((file, index) => (
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
                      onClick={() => handleSave(report.id)}
                      className="mt-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition"
                    >
                      Сохранить
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Модальное окно для просмотра фото */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setModalImage(null)}
        >
          <img
            src={modalImage}
            alt="Просмотр фото"
            className="max-w-3xl max-h-[80vh] rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default ModeratorPanel;
