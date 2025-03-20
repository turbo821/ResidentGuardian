import React from "react";

const AboutPage = () => {
  return (
    <div className="flex items-center justify-center min-h-[85vh] bg-blue-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
        {/* Заголовок */}
        <h2 className="text-4xl font-bold text-center text-gray-800">О портале ResidentGuardian</h2>
        <p className="mt-4 text-lg text-gray-700 text-center">
          ResidentGuardian — это платформа, позволяющая жителям города сообщать о проблемах в городском хозяйстве 
          и следить за их устранением. Наша цель — сделать город лучше и безопаснее!
        </p>

        {/* Основные возможности */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Карточка 1 */}
          <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold">Добавление проблем</h3>
            <p className="mt-2 text-sm">
              Сообщайте о проблемах на карте и отправляйте заявки на их решение.
            </p>
          </div>

          {/* Карточка 2 */}
          <div className="bg-green-500 text-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold">Просмотр на карте</h3>
            <p className="mt-2 text-sm">
              Следите за состоянием города в режиме реального времени.
            </p>
          </div>

          {/* Карточка 3 */}
          <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold">Обсуждение и комментарии</h3>
            <p className="mt-2 text-sm">
              Оставляйте комментарии и участвуйте в решении городских вопросов.
            </p>
          </div>

          {/* Карточка 4 */}
          <div className="bg-red-500 text-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold">Контроль решения</h3>
            <p className="mt-2 text-sm">
              Следите за процессом устранения проблем через платформу.
            </p>
          </div>
        </div>

        {/* Кнопка возврата */}
        <div className="mt-6 text-center">
          <a href="/" className="text-green-500 hover:underline font-bold text-lg">
            Вернуться на главную
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
