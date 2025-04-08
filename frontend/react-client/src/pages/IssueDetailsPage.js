import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Answer from "../components/IssueDetailsPage/Answer";
import ModalImage from "../components/ModalImage";

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
    category: "Дорожные проблемы",
    moderatorResponses: [
      {
        text: "Работы запланированы на следующую неделю.",
        images: ["https://via.placeholder.com/600x400?text=Исправлено"]
      }
    ]
  },
  {
    id: 2,
    title: "Не работает фонарь",
    status: "Решено",
    images: ["https://via.placeholder.com/600x400?text=Фонарь"],
    description: "Фонарь не работает уже неделю во дворе дома 12.",
    category: "Освещение",
    moderatorResponses: [
      {
        text: "Фонарь заменён.",
        images: []
      }
    ]
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
    category: "Другое",
    moderatorResponses: []
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

        {issue.moderatorResponses && issue.moderatorResponses.length > 0 && (
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Ответ(ы) модератора</h3>
            {issue.moderatorResponses.map((response, idx) => (
              <Answer answer={response} idx={idx} openModal={openModal} />
            ))}
          </div>
        )}
      </div>

      {modalImage && (
        <ModalImage modalImage={modalImage} closeModal={closeModal} />
      )}


    </div>
  );
};

export default IssueDetailsPage;
