import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Answer from "../components/IssueDetailsPage/Answer";
import ModalImage from "../components/ModalImage";
import api from "../api";
import { imagesURL } from "../api";
import viewStatus from "../functions/viewStatus";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./IssueDetailsPage.css";
import { useAuth } from "../context/AuthContext";
import ModeratorForm from "../components/IssueDetailsPage/ModeratorForm";
import CommentForm from "../components/IssueDetailsPage/CommentForm";
import Comment from "../components/IssueDetailsPage/Comment";

const IssueDetailsPage = () => {
  const fileInputRef = useRef(null);
  const { id } = useParams();
  const { user } = useAuth();
  const [issue, setIssue] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const navigate = useNavigate();

  const isModerator = user?.roles?.includes("Moderator") && user.moderatorCategories.some(
    (moderatorCategory) => moderatorCategory?.title === issue?.category
  );

  const [newAnswer, setNewAnswer] = useState({
    text: "",
    images: [],
    status: 0
  });

  const [comments, setComments] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [commentText, setCommentText] = useState('');

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
    fetchIssue(id); 
    fetchIssueComments(id);
    fetchIssueAnswers(id);
  }, [id]);

  const fetchIssue = async(id) => {
    try {
      const response = await api.get(`/api/issues/${id}`);
      setIssue(response.data);
    }
    catch(err) {
      console.log(err.response);
    }
  }

  const fetchIssueComments = async(id) => {
    try {
      const response = await api.get(`/api/issues/${id}/comments`);
      setComments(response.data);
    }
    catch(err) {
      console.log(err.response);
    }
  }

  const fetchIssueAnswers = async(id) => {
    try {
      const response = await api.get(`/api/issues/${id}/answers`);
      setAnswers(response.data);
    } catch(err) {
      console.log(err.response);
    }
  }

  const addComment = async(text) => {
    try {
      const request = { text: text };
      const response = await api.post(`/api/issues/${id}/comments`, request);

      console.log(response);
      setCommentText("");
      setComments(prev => [response.data, ...prev ]);

    } catch(err) {
      console.log(err.response);
    }
  }

  const addAnswer = async() => {
    const formData = new FormData();
    
    formData.append('updateStatus', newAnswer.updateStatus);
    formData.append('text', newAnswer.text || "");
    
    newAnswer.images.forEach((image) => {
      formData.append(`Images`, image);
    });

    try {
      const response = await api.post(`/api/issues/${id}/answers`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const newAnswer = response.data;
      setAnswers(prev => [...prev, newAnswer]);
    } catch (err) {
      console.log(err.response);
    }
    finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      setNewAnswer({
          text: "",
          images: [],
          status: 0
      });
    }
  }

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
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{issue.title}</h2>
        
        <div className="mb-6 p-2">
          <Slider
            dots={issue.images.length > 1}
            infinite={issue.images.length > 1}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            centerMode={issue.images.length > 1}
            centerPadding="0"
            arrows={issue.images.length > 1}
            className="slick-slider-custom"
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                }
              }
            ]}
          >
            {issue.images.map((img, index) => (
              <div key={index} className="px-2 outline-none">
                <img
                  src={`${imagesURL}/${img}`}
                  alt={img}
                  onClick={() => openModal(img)}
                  className="w-full h-60 sm:h-80 md:h-96 object-contain rounded-lg cursor-pointer hover:opacity-80 transition bg-gray-50 mx-auto"
                />
              </div>
            ))}
          </Slider>
        </div>
  
        <div className="flex items-center gap-2">
            <span className={`inline-block w-3 h-3 rounded-full ${
              issue.status === 0 
                ? "bg-green-500" 
                : issue.status === 1 
                  ? "bg-yellow-500" 
                  : issue.status === 2 
                    ? "bg-blue-500"
                    : "bg-red-500"
            }`}></span>
            <p className="text-gray-700"><strong>Статус:</strong> {viewStatus(issue.status)}</p>
          </div>
        
        <p className="text-gray-700 mb-2"><strong>Категория:</strong> {issue.category}</p>
        <p className="text-gray-700 mb-2"><strong>Местоположение:</strong> {issue.location}</p>
        <p className="text-gray-700 mb-6"><strong>Описание:</strong> {issue?.description}</p>
  
        <Link 
          onClick={() => navigate(-1)} 
          className="inline-block hover:text-green-500 text-green-400 font-bold py-3 px-6 rounded-lg transition"
        >
          Назад к обращениям
        </Link>

        <div className="mt-8">
          {answers && answers?.length > 0 && (
            <>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Ответы модератора</h3>
              {answers.map((answer, idx) => (
                <Answer key={idx} answer={answer} openModal={openModal} />
              ))}
            </>
          )}
        </div>

        {isModerator && (
          <ModeratorForm issueId={id} answer={newAnswer} setAnswer={setNewAnswer} addAnswer={addAnswer} fileInputRef={fileInputRef}/>
        )}

        <div className="mt-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Комментарии</h3>
          
          <CommentForm commentText={commentText} setCommentText={setCommentText} submit={addComment} />
          
          <div className="space-y-4">
            {comments?.length > 0 ? (
              comments.map((comment, idx) => (
                <Comment key={idx} comment={comment} />
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">Пока нет комментариев</p>
            )}
          </div>
        </div>

      </div>
  
      {modalImage && (
        <ModalImage modalImage={modalImage} closeModal={closeModal} />
      )}
    </div>
  );
};

export default IssueDetailsPage;
