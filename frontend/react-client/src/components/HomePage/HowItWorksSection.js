import { Link } from "react-router-dom";

const HowItWorksSection = () => {
  const steps = [
    {
      title: "Сообщите о проблеме",
      description: "Заполните простую форму с описанием проблемы и её местоположением",
      icon: "📝",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      borderColor: "border-blue-200"
    },
    {
      title: "Отслеживайте статус",
      description: "Получайте уведомления о ходе рассмотрения вашего обращения",
      icon: "🔍",
      bgColor: "bg-green-100",
      textColor: "text-green-600",
      borderColor: "border-green-200"
    },
    {
      title: "Проблема решена!",
      description: "Когда проблема будет устранена, вы получите подтверждение",
      icon: "✅",
      bgColor: "bg-indigo-100",
      textColor: "text-indigo-600",
      borderColor: "border-indigo-200"
    }
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Как это работает</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Простой и понятный процесс подачи и отслеживания обращений
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`${step.bgColor} ${step.borderColor} border-l-4 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1`}
            >
              <div className={`${step.textColor} text-5xl mb-6`}>{step.icon}</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              <div className="mt-4 text-right">
                <span className={`${step.textColor} text-sm font-semibold`}>Шаг {index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;