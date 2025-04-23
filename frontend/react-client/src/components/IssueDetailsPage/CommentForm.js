const CommentForm = ({ commentText, setCommentText }) => {
  const handleCommentSubmit = () => {
    
  }
  return (
    <form onSubmit={handleCommentSubmit} className="mb-6">
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Оставьте комментарий..."
        rows="3"
        required
      />
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition"
      >
        Отправить комментарий
      </button>
    </form>
  )
}
export default CommentForm;