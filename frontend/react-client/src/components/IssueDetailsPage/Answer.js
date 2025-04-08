
const Answer = ({ idx, answer, openModal }) => {
  return (
    <div key={idx} className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
      <p className="text-gray-700 mb-2"><strong>Комментарий:</strong> {answer.text}</p>

      {answer.images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          {answer.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Ответ ${idx + 1} - Фото ${index + 1}`}
              onClick={() => openModal(img)}
              className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Answer;