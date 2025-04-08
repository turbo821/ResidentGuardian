
const Filters = ({ status, setStatus, category, setCategory, timeRange, setTimeRange, handleApply, handleReset }) => {

  return (
    <div className="flex flex-col gap-4 mb-6 bg-slate-200 px-6 py-3 rounded-xl m-5">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 mt-4">
        <div className="flex flex-col">
          <label className="font-semibold mb-1 text-gray-700">Статус:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg bg-white"
          >
            <option value="all">Все</option>
            <option value="new">Новые</option>
            <option value="in_progress">В обработке</option>
            <option value="resolved">Решённые</option>
            <option value="rejected">Отклонённые</option>
          </select>
        </div>

        {/* Категория */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1 text-gray-700">Категория:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg bg-white"
          >
            <option value="all">Все</option>
            <option value="road">Дорожные проблемы</option>
            <option value="lighting">Освещение</option>
            <option value="garbage">Мусор</option>
            <option value="landscaping">Благоустройство</option>
            <option value="transport">Общественный транспорт</option>
          </select>
        </div>

        {/* Временной период */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1 text-gray-700">Период:</label>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg bg-white"
          >
            <option value="all">За всё время</option>
            <option value="day">Последний день</option>
            <option value="week">Последняя неделя</option>
            <option value="month">Последний месяц</option>
          </select>
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-2">
          <button
            onClick={handleApply}
            className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Применить
          </button>
          <button
            onClick={handleReset}
            className="bg-gray-400 text-white px-5 py-2 rounded-lg hover:bg-gray-500 transition"
          >
            Сбросить
          </button>
        </div>
    </div>
  )
}

export default Filters;