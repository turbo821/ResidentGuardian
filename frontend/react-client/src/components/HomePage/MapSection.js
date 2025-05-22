import { Link } from "react-router-dom"
import cityMap from "../../assets/images/map-image3.jpg";

const MapSection = () => {
  return (
    <section className="container mx-auto px-4 py-16 space-y-16 flex flex-col md:flex-row items-center">
    <div className="text-white md:w-1/2 bg-blue-500 bg-opacity-80 p-8 rounded-lg max-w-lg">
      <h2 className="text-3xl font-bold">Карта городских проблем</h2>
      <p className="mt-4 text-lg max-w-2xl">
        Просматривайте существующие проблемы на карте и следите за их решением.
      </p>
      <Link 
        to="/map" 
        className="mt-6 inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition"
      >
        Перейти к карте
      </Link>
    </div>
    <div className="md:w-1/2 flex justify-end">
      <img src={cityMap} alt="Карта проблем" className="map-image w-full h-auto rounded-lg shadow-lg" />
    </div>
  </section>
  )
};

export default MapSection;