import { Link } from "react-router-dom";

const AboutPage = () => {
  const features = [
    {
      title: "Добавление проблем",
      description: "Сообщайте о проблемах на карте с фото и описанием, отправляйте заявки на их решение",
      icon: "📍",
      color: "bg-blue-100",
      textColor: "text-blue-800"
    },
    {
      title: "Просмотр на карте",
      description: "Интерактивная карта с фильтрами для отслеживания состояния города в реальном времени",
      icon: "🗺️",
      color: "bg-green-100",
      textColor: "text-green-800"
    },
    {
      title: "Обсуждение проблем",
      description: "Комментируйте, голосуйте и участвуйте в решении важных городских вопросов",
      icon: "💬",
      color: "bg-amber-100",
      textColor: "text-amber-800"
    },
    {
      title: "Контроль решения",
      description: "Получайте уведомления о каждом этапе рассмотрения вашего обращения",
      icon: "✅",
      color: "bg-emerald-100",
      textColor: "text-emerald-800"
    },
    {
      title: "Каталог обращений",
      description: "Полноценный каталог с поиском и фильтрами для удобного просмотра всех обращений",
      icon: "📑",
      color: "bg-indigo-100",
      textColor: "text-indigo-800"
    },
    {
      title: "Мобильная версия",
      description: "Полнофункциональная веб-версия, оптимизированная для всех мобильных устройств",
      icon: "📲",
      color: "bg-blue-100",
      textColor: "text-blue-800"
    }
  ];

  return (
    <div className="min-h-[85vh] bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            О платформе <span className="text-blue-600">ResidentGuardian</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Инновационная платформа для взаимодействия жителей с городскими службами
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`${feature.color} p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border-l-4 ${feature.textColor.replace('text', 'border')}`}
            >
              <div className={`text-3xl mb-4 ${feature.textColor}`}>{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-5xl mx-auto">
          <div className="md:flex">
            <div className="md:w-1/2 bg-blue-600 p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Наша миссия</h2>
              <p className="mb-6">
                Мы создаем прозрачную систему взаимодействия между жителями и городскими службами, 
                где каждая проблема находит решение.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="text-2xl mr-3">🏙️</div>
                  <p>Улучшаем городскую среду вместе с жителями</p>
                </div>
                <div className="flex items-start">
                  <div className="text-2xl mr-3">⏱️</div>
                  <p>Сокращаем время реагирования на проблемы</p>
                </div>
                <div className="flex items-start">
                  <div className="text-2xl mr-3">📈</div>
                  <p>Повышаем эффективность городского управления</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Как начать использовать</h2>
              <ol className="space-y-4">
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">1</span>
                  <p>Зарегистрируйтесь на платформе</p>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">2</span>
                  <p>Найдите проблему на карте или добавьте новую</p>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1">3</span>
                  <p>Отслеживайте статус решения и получайте уведомления</p>
                </li>
              </ol>
              <div className="mt-8 space-y-3">
                <Link 
                  to="/register" 
                  className="block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-center transition"
                >
                  Зарегистрироваться
                </Link>
                <Link 
                  to="/" 
                  className="block text-blue-600 hover:text-blue-800 font-medium text-center"
                >
                  Вернуться на главную
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;