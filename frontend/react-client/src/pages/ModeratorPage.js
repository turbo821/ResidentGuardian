import React, { useState } from "react";
import ModeratorIssue from "../components/ModeratorPage/ModeratorIssue";
import ModalImage from "../components/ModalImage";

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

              {openId === report.id && (
                <ModeratorIssue 
                  issue={report}
                  handleStatusChange={handleStatusChange}
                  handlePhotoUpload={handlePhotoUpload}
                  handleResponseChange={handleResponseChange}
                  setModalImage={setModalImage}
                  handleSave={handleSave}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {modalImage && (
        <ModalImage 
          modalImage={modalImage} 
          closeModal={() => setModalImage(null)}
        />
      )}
    </div>
  );
};

export default ModeratorPanel;
