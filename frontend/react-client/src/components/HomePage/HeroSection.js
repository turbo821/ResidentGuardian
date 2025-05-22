import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative sity-image">
      <section className="container mx-auto relative text-white py-20 md:py-32 px-4 flex items-center min-h-[400px]">
        <div className="bg-blue-500 bg-opacity-80 p-6 md:p-8 rounded-lg w-full max-w-lg mx-4 relative z-10">
          <h1 className="text-2xl md:text-4xl font-bold leading-tight">
            Добро пожаловать в ResidentGuardian
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            Платформа для подачи обращений о проблемах городского хозяйства. 
            Сообщите о проблеме, и она не останется без внимания.
          </p>
          <div className="mt-5 md:mt-6 space-y-3">
            <Link 
              to="/report" 
              className="block bg-green-500 hover:bg-green-600 text-white font-bold py-2 md:py-3 px-4 md:px-6 rounded-lg transition text-center text-sm md:text-base"
            >
              Сообщить о проблеме
            </Link>
            <div className="flex space-x-3">
              <Link 
                to="/login" 
                className="flex-1 bg-white hover:bg-gray-100 text-blue-500 font-bold py-2 md:py-3 px-4 md:px-6 rounded-lg transition text-center text-sm md:text-base"
              >
                Войти
              </Link>
              <Link 
                to="/register" 
                className="flex-1 bg-transparent border-2 border-white hover:bg-white hover:bg-opacity-20 text-white font-bold py-2 md:py-3 px-4 md:px-6 rounded-lg transition text-center text-sm md:text-base"
              >
                Регистрация
              </Link>
            </div>
            <Link 
              to="/about" 
              className="block text-green-300 hover:text-green-400 hover:underline font-bold text-center text-sm md:text-base"
            >
              Подробнее о платформе
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
};

export default HeroSection;