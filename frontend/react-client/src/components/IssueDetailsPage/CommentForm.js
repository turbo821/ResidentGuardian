const CommentForm = ({ commentText, setCommentText, submit }) => {
  const handleCommentSubmit = () => {
    console.log("Submit");
    submit(commentText);
  }

  return (
    <div className="mb-6">
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Оставьте комментарий..."
        rows="3"
        required
      />
      <button onClick={handleCommentSubmit}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition"
      >
        Отправить комментарий
      </button>
    </div>
  )
}
export default CommentForm;