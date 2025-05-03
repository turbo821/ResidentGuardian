const Comment = ({ comment }) => {
  const date = new Date(comment.createdAt);
  const formattedDate = date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  
  return (
    <div className={`p-4 border border-gray-200 rounded-lg bg-white`}>
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-blue-600">{comment?.fullName}</h4>
        <span className="text-xs text-gray-500">{formattedDate}</span>
      </div>
      <p className="text-gray-700 whitespace-pre-line">{comment.text}</p>
    </div>
  );
};

export default Comment;