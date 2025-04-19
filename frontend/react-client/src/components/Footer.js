const Footer = () => {
  return (
    <footer className="bg-blue-700 text-white shadow-lg mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="text-center lg:text-left">
            <p className="text-sm md:text-base">
              © 2025 ResidentGuardian. Все права защищены.
            </p>
            <p className="text-xs md:text-sm text-blue-200 mt-1">
              Платформа для взаимодействия жителей с управляющими компаниями
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-6">
            <a 
              href="#" 
              className="text-sm md:text-base px-3 py-1 rounded hover:bg-blue-600 transition whitespace-nowrap"
            >
              Контакты
            </a>
            <a 
              href="#" 
              className="text-sm md:text-base px-3 py-1 rounded hover:bg-blue-600 transition whitespace-nowrap"
            >
              Политика конфиденциальности
            </a>
            <a 
              href="#" 
              className="text-sm md:text-base px-3 py-1 rounded hover:bg-blue-600 transition whitespace-nowrap"
            >
              Условия использования
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;