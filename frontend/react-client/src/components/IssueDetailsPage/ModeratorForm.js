import viewStatus from "../../functions/viewStatus"

const ModeratorForm = ({ answer, setAnswer }) => {

  const handleAnswerSubmit = () => {

  }

  const handleImageUpload = () => {

  }

  return (
      <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Ответить на обращение</h3>
        <form onSubmit={handleAnswerSubmit}>
          <textarea
            value={answer.text}
            onChange={(e) => setAnswer({...answer, text: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ваш ответ..."
            rows="4"
            required
          />
          
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Изменить статус</label>
              <select
                value={answer.status}
                onChange={(e) => setAnswer({...answer, status: parseInt(e.target.value)})}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                {[0,1,2,3].map(status => (
                  <option value={status}>{viewStatus(status)}</option>
                ))}
              </select>
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Прикрепить изображения</label>
              <input
                type="file"
                multiple
                onChange={handleImageUpload}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </div>
          </div>
          
          {/* {responseImages.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Выбранные изображения:</p>
              <div className="flex flex-wrap gap-2">
                {responseImages.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(img)}
                      alt={`Preview ${index}`}
                      className="h-16 w-16 object-cover rounded border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => setResponseImages(responseImages.filter((_, i) => i !== index))}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )} */}
          
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition"
          >
            Отправить ответ
          </button>
        </form>
      </div>
  )
}

export default ModeratorForm;