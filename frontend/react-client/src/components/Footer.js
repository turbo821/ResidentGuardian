const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4"> 
      <div className="container mx-auto text-center">
        <p>© 2024 ResidentGuardian. Все права защищены.</p>
        <div className="mt-4">
          <a href="#" className="mx-2 hover:text-green-400">Контакты</a>
          <a href="#" className="mx-2 hover:text-green-400">Политика конфиденциальности</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;