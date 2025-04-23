const Comment = ({ comment, isExample = false }) => {
  const date = new Date(comment.createdAt);
  const formattedDate = date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  
  return (
    <div className={`p-4 border border-gray-200 rounded-lg bg-white ${isExample ? 'opacity-75' : ''}`}>
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-blue-600">{comment.user.name}</h4>
        <span className="text-xs text-gray-500">{formattedDate}</span>
      </div>
      <p className="text-gray-700 whitespace-pre-line">{comment.text}</p>
      
      {isExample && (
        <div className="mt-1 text-xs text-gray-500 italic">
          Это пример комментария. В реальном приложении здесь будут комментарии пользователей.
        </div>
      )}
    </div>
  );
};

export default Comment;