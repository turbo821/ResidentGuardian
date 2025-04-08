import React, { useState } from "react";
import MapModal from "../components/MapModal";

const ReportPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("road");
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState({ text: "Выбрать на карте", coords: null });
  const [isMapOpen, setIsMapOpen] = useState(false);

  const handleImageUpload = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, description, category, images, location });
    alert("Обращение отправлено!");
  };

  const handleMapClick = (e) => {
    const coords = e.get("coords");
    setLocation({ text: `Координаты: ${coords[0].toFixed(5)}, ${coords[1].toFixed(5)}`, coords });
    setIsMapOpen(false);
  };

  return (
    <div className="min-h-[90vh] bg-blue-100 flex flex-col items-center py-12 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
        <h2 className="text-4xl font-bold text-center text-gray-800">Создать обращение</h2>
        <p className="mt-2 text-lg text-center text-gray-700">
          Опишите проблему и укажите её местоположение.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Название проблемы"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-3 border rounded-lg"
          />

          <textarea
            placeholder="Опишите проблему..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-3 border rounded-lg h-32"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border rounded-lg"
          >
            <option value="road">Дорожные проблемы</option>
            <option value="lighting">Освещение</option>
            <option value="garbage">Мусор</option>
            <option value="other">Другое</option>
          </select>

          <label className="block text-gray-700 font-bold">Выбор фото:</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="w-full p-2 border rounded-lg"
          />

          <button
            type="button"
            onClick={() => setIsMapOpen(true)}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            {location.text}
          </button>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            Отправить обращение
          </button>
        </form>
      </div>

      <MapModal isMapOpen={isMapOpen} setIsMapOpen={setIsMapOpen} />
    </div>
  );
};

export default ReportPage;
