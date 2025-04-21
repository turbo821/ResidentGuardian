import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Answer from "../components/IssueDetailsPage/Answer";
import ModalImage from "../components/ModalImage";
import api from "../api";
import { imagesURL } from "../api";
import viewStatus from "../functions/viewStatus";

const IssueDetailsPage = () => {
  const { id } = useParams();
  const [issue, setIssue] = useState(null);

  const [modalImage, setModalImage] = useState(null);

  const openModal = (img) => setModalImage(img);
  const closeModal = () => setModalImage(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setModalImage(null);
      }
    };

    if (!!modalImage) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalImage, setModalImage]);

  useEffect(() => {
    const fetchIssue = async(id) => {
      try {
        const response = await api.get(`/api/issues/${id}`);
        setIssue(response.data);
      }
      catch(err) {
        console.log(err.response);
      }
    }

    fetchIssue(id); 
  }, [id]);

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
              src={`${imagesURL}/${img}`}
              alt={img}
              onClick={() => openModal(img)}
              className="w-full h-60 object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
            />
          ))}
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-2">{issue.title}</h2>
        <p className="text-gray-600 mb-2"><strong>Статус:</strong> {viewStatus(issue.status)}</p>
        <p className="text-gray-600 mb-2"><strong>Категория:</strong> {issue.category}</p>
        <p className="text-gray-700 mb-6"><strong>Описание:</strong> {issue.description}</p>

        <Link 
          to="/issues" 
          className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition"
        >
          Назад к обращениям
        </Link>

        {issue.Answers && issue.Answers.length > 0 && (
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Ответ(ы) модератора</h3>
            {issue.Answers.map((response, idx) => (
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
