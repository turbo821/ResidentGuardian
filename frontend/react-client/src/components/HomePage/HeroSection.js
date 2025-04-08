import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="sity-image">
      <section
        className="container mx-auto space-y-16 relative bg-cover bg-center text-white py-32 px-6 flex items-center"
      >
        <div className="bg-blue-500 bg-opacity-50 p-8 rounded-lg max-w-lg">
          <h1 className="text-4xl font-bold">Добро пожаловать в ResidentGuardian</h1>
          <p className="mt-4 text-lg">
            Платформа для подачи обращений о проблемах городского хозяйства. 
            Сообщите о проблеме, и она не останется без внимания.
          </p>
          <div className="mt-6 space-y-3">
            <Link 
              to="/report" 
              className="block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition text-center"
            >
              Сообщить о проблеме
            </Link>
            <Link 
              to="/about" 
              className="block text-green-500 hover:underline font-bold text-center"
            >
              Подробнее
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
};

export default HeroSection;