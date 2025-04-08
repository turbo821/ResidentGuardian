
const ModalImage = ({ modalImage, closeModal = () => {} }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
    <div className="relative max-w-3xl w-full px-4">
      <button
        onClick={closeModal}
        className="absolute top-2 right-2 text-white text-2xl font-bold bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 transition"
      >
        &times;
      </button>
      <img
        src={modalImage}
        alt="Просмотр фото"
        className="w-full max-h-[80vh] object-contain rounded-lg shadow-lg"
      />
    </div>
  </div>
  )
};

export default ModalImage;