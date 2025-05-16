import { useState, useEffect, useRef } from "react";
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
import toast, { Toaster } from "react-hot-toast";
import ConfirmDelete from "../components/ConfirmDelete";

const IssueDetailsPage = () => {
  const fileInputRef = useRef(null);
  const { id } = useParams();
  const { user } = useAuth();
  const [issue, setIssue] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [confirmDeleted, setConfirmDeleted] = useState(false);

  const isModerator = user?.roles?.includes("Moderator") && user.moderatorCategories.some(
    (moderatorCategory) => moderatorCategory?.title === issue?.category
  );
  const isAdmin = user?.roles?.includes("Admin");
  const isCurrentUser = user?.id === issue?.userId;

  const [newAnswer, setNewAnswer] = useState({
    text: "",
    images: [],
    updateStatus: 0
  });

  const [comments, setComments] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [commentText, setCommentText] = useState('');

  const [likes, setLikes] = useState(issue?.likeCount || 0);
  const [dislikes, setDislikes] = useState(issue?.dislikeCount || 0);
  const [userVote, setUserVote] = useState(issue?.like);

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
      setLikes(response.data.likeCount || 0);
      setDislikes(response.data.dislikeCount || 0);
      setUserVote(response.data.like);
    }
    catch(err) {
      console.log(err.response);
    }
  }

  const handleDeleteIssue = async(id) => {
    const softDeletion = true;
    try {
      await api.delete(`/api/issues/${id}?softDeletion=${softDeletion}`);
      toast.success("Обращение успешно удалено", { duration: 2000 });
    }
    catch(err) {
      toast.error("Ошибка при удалении обращения", { duration: 2000 });
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
      setCommentText("");
      setComments(prev => [...prev, response.data ]);
      toast.success("Комментарий успешно отправлен", { duration: 2000 });
    } catch(err) {
      toast.error("Ошибка при отправлении комментария", { duration: 2000 });
      console.log(err.response);
    }
  }

  const addAnswer = async() => {
    resetErrors();
    if (!validateAnswer()) {
      return;
    }

    const formData = new FormData();
    
    formData.append('updateStatus', newAnswer.updateStatus);
    formData.append('text', newAnswer.text);
    
    newAnswer.images.forEach((image) => {
      formData.append(`Images`, image);
    });

    try {
      const response = await api.post(`/api/issues/${id}/answers`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const newAnswer = response.data;
      setAnswers(prev => [...prev, newAnswer]);
      toast.success("Ответ успешно отправлен", { duration: 2000 });
    } catch (err) {
      toast.error("Ошибка при отправлении ответа", { duration: 2000 });
      console.log(err.response);
    }
    finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      setNewAnswer({
          text: "",
          images: [],
          updateStatus: 0
      });
    }
  }

  const validateAnswer = () => {
    const newErrors = {};
    if (!newAnswer.text) {
      newErrors.text = "Укажите текст ответа!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetErrors = () => {
    setErrors({});
  };

  const handleLike = async() => {
    if (!user) return;

    if (userVote === true) {
      setLikes(prev => prev - 1);
      setUserVote(null);
      await deleteGrade(id);
    } else {
      setLikes(prev => prev + 1);
      if (userVote === false) {
        setDislikes(prev => prev - 1);
        await deleteGrade(id);
      }
      setUserVote(true);
      await addGrade(id, true);
    }
  };

  const handleDislike = async() => {
    if (!user) return;

    if (userVote === false) {
      setDislikes(prev => prev - 1);
      setUserVote(null);
      await deleteGrade(id);
    } else {
      setDislikes(prev => prev + 1);
      if (userVote === true) {
        setLikes(prev => prev - 1);
        await deleteGrade(id);
      }
      setUserVote(false);
      await addGrade(id, false);
    }
  };

    const addGrade = async(id, grade) => {
      try {
        await api.post(`/api/issues/${id}/grades`, grade, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } catch(err) {
        console.log(err.response);
      }
    }

  const deleteGrade = async(id) => {
    try {
      await api.delete(`/api/issues/${id}/grades`);
    } catch(err) {
      console.log(err.response);
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
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full relative">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-3xl font-bold text-gray-800">{issue.title}</h2>
          {(isAdmin || isModerator || isCurrentUser) && <button
            onClick={() => setConfirmDeleted(true)}
            className="text-red-500 hover:text-red-700 transition-colors"
            title="Удалить обращение"
            aria-label="Удалить"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>}
        </div>
        
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
  
        <div className="flex flex-row justify-between items-start gap-4 mb-4">
          <div className="flex flex-col gap-2">
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
              
              <p className="text-gray-700"><strong>Категория:</strong> {issue.category}</p>
          </div>
            
          <div className="flex items-center gap-2">
            <button 
              onClick={handleLike}
              className={`flex items-center gap-1 p-1 rounded-md transition ${userVote === true ? 'text-green-500 bg-green-50' : 'text-gray-500 hover:text-green-500'}`}
              aria-label="Like"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              <span>{likes}</span>
            </button>
            
            <button 
              onClick={handleDislike}
              className={`flex items-center gap-1 p-1 rounded-md transition ${userVote === false ? 'text-red-500 bg-red-50' : 'text-gray-500 hover:text-red-500'}`}
              aria-label="Dislike"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" strokeWidth={2} d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54" />
              </svg>
              <span>{dislikes}</span>
            </button>
          </div>
        </div>

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
          <div className="relative">
            {errors.text && <p className="absolute mt-0 top-12 right-10 text-sm text-red-600">{errors.text}</p>}
            <ModeratorForm issueId={id} answer={newAnswer} setAnswer={setNewAnswer} addAnswer={addAnswer} fileInputRef={fileInputRef}/>
          </div>
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
      <Toaster/>
      {(isModerator || isAdmin || isCurrentUser) && confirmDeleted && (
        <ConfirmDelete
          itemTitle={"обращение"}
          item={issue}
          handleDelete={handleDeleteIssue}
          setConfirmOpen={setConfirmDeleted}
        />
      )}
    </div>
  );
};

export default IssueDetailsPage;
