import { imagesURL } from "../../api";
import viewStatus from "../../functions/viewStatus";

const Answer = ({ answer, openModal }) => {
  const date = new Date(answer.createdAt);
  const formattedDate = date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const statusChanged = typeof answer.oldStatus !== 'undefined' && 
                        answer.oldStatus !== null && 
                        answer.oldStatus !== answer.newStatus;

  return (
    <div className={`mb-6 p-6 rounded-lg border-l-4 ${
      answer.newStatus === 0 ? 'border-green-500 bg-green-50' :
      answer.newStatus === 1 ? 'border-yellow-500 bg-yellow-50' : 
      answer.newStatus === 2 ? "border-blue-500 bg-blue-50" : 
      answer.newStatus === 3 ? "border-red-500 bg-red-50" :
      "border-grey-500 bg-grey-50"
      }`}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-bold text-lg">
            {answer.fullName}
          </h4>
          {statusChanged && (
            <div className="flex items-center mt-1 text-sm text-gray-600">
              <span className="mr-2">Статус изменён:</span>
              <span className={`px-2 py-0.5 rounded ${
                answer.oldStatus === 0 ? 'bg-green-100 text-green-800' :
                answer.oldStatus === 1 ? 'bg-yellow-100 text-yellow-800' :
                answer.oldStatus === 2 ? "bg-blue-100 text-blue-800" : 
                answer.oldStatus === 3 ? "bg-red-100 text-red-800" :
                'bg-blue-100 text-blue-800'
              }`}>
                {viewStatus(answer.oldStatus)}
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
              <span className={`px-2 py-0.5 rounded ${
                answer.newStatus === 0 ? 'bg-green-100 text-green-800' :
                answer.newStatus === 1 ? 'bg-yellow-100 text-yellow-800' :
                answer.newStatus === 2 ? "bg-blue-100 text-blue-800" : 
                answer.newStatus === 3 ? "bg-red-100 text-red-800" :
                'bg-blue-100 text-blue-800'
              }`}>
                {viewStatus(answer.newStatus)}
              </span>
            </div>
          )}
        </div>
        <span className="text-sm text-gray-500">{formattedDate}</span>
      </div>
      
      <p className="text-gray-700 mb-4 whitespace-pre-line">{answer.text}</p>
      
      {answer.images && answer?.images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {answer.images.map((img, index) => (
            <img
              key={index}
              src={`${imagesURL}/${img}`}
              alt={`Ответ - Фото ${index + 1}`}
              onClick={() => openModal(img)}
              className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-80 transition border border-gray-200"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Answer;