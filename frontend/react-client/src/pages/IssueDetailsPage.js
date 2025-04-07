import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

// Временные данные
const dummyIssues = [
  {
    id: 1,
    title: "Яма на дороге",
    status: "В ожидании",
    images: [
      "https://via.placeholder.com/600x400?text=Фото+1",
      "https://via.placeholder.com/600x400?text=Фото+2"
    ],
    description: "Большая яма на главной улице, мешает проезду транспорта.",
    category: "Дорожные проблемы"
  },
  {
    id: 2,
    title: "Не работает фонарь",
    status: "Решено",
    images: [
      "https://via.placeholder.com/600x400?text=Фонарь"
    ],
    description: "Фонарь не работает уже неделю во дворе дома 12.",
    category: "Освещение"
  },
  {
    id: 3,
    title: "Сломанная лавочка",
    status: "В процессе",
    images: [
      "https://via.placeholder.com/600x400?text=Лавочка+1",
      "https://via.placeholder.com/600x400?text=Лавочка+2",
      "https://via.placeholder.com/600x400?text=Лавочка+3"
    ],
    description: "В парке рядом с домом сломана лавочка. Опасно для детей.",
    category: "Другое"
  }
];

const IssueDetailsPage = () => {
  const { id } = useParams();
  const issueId = parseInt(id, 10);
  const issue = dummyIssues.find((i) => i.id === issueId);

  const [modalImage, setModalImage] = useState(null);

  const openModal = (img) => setModalImage(img);
  const closeModal = () => setModalImage(null);

  if (!issue) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center bg-blue-100">
        <div className="text-center text-gray-700 text-xl">Обращение не найдено.</div>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] bg-blue-100 flex flex-col items-center py-12 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
        {/* Галерея изображений */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {issue.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Фото ${index + 1}`}
              onClick={() => openModal(img)}
              className="w-full h-60 object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
            />
          ))}
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-2">{issue.title}</h2>
        <p className="text-gray-600 mb-2"><strong>Статус:</strong> {issue.status}</p>
        <p className="text-gray-600 mb-2"><strong>Категория:</strong> {issue.category}</p>
        <p className="text-gray-700 mb-6"><strong>Описание:</strong> {issue.description}</p>

        <Link 
          to="/issues" 
          className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition"
        >
          Назад к обращениям
        </Link>
      </div>

      {/* Модальное окно */}
      {modalImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative max-w-3xl w-full px-4">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white text-2xl font-bold bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 transition"
            >
              &times;
            </button>
            <img
              src={modalImage}
              alt="Просмотр фото"
              className="w-full max-h-[80vh] object-contain rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueDetailsPage;
