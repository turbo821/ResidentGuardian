const Comment = ({ comment, isAdmin, isModerator, handleDeleteComment }) => {
  const date = new Date(comment.createdAt);
  const formattedDate = date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  
  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-white group relative">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-blue-600">{comment?.fullName}</h4>
        <span className="text-xs text-gray-500">{formattedDate}</span>
      </div>
      <p className="text-gray-700 whitespace-pre-line">{comment.text}</p>
      {(isModerator || isAdmin) && 
        <button
          type="button"
          onClick={() => handleDeleteComment(comment.id)}
          className="absolute 
          top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-50"
        >
          ×
        </button>
      }
    </div>
  );
};

export default Comment;