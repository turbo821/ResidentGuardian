import React, { useState, useEffect, useRef } from "react";
import MapModal from "../components/MapModal";
import axios from "axios";
import api from "../api";
import UploadImage from "../components/ReportPage/UploadImage";

const ReportPage = () => {
  const fileInputRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectCategory, setSelectCategory] = useState("1");
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState({ text: "", coords: null });
  const [isMapOpen, setIsMapOpen] = useState(false);

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const fetchAllCategories = async() => {
    try {
      const response = await api.get("/api/categories");
      setCategories(response.data);
    }
    catch(err) {
      console.log(err.response);
    }
  }

  const handleImageUpload = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async() => {
    if (images.length === 0) return console.log("Not select images");
  
    const formData = new FormData();
    
    formData.append('title', title);
    formData.append('description', description || "");
    formData.append('categoryId', selectCategory);
    formData.append('location', location.text);
    formData.append('pointLatitude', location.coords !== null ? location?.coords[0] : null);
    formData.append('pointLongitude', location.coords !== null ? location?.coords[1] : null);
    
    images.forEach((image, index) => {
      formData.append(`Images`, image);
    });
    console.log(location.coords);
    try {
      const response = await api.post('/api/issues', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert(`Add issue: ${response.data}`);

    } catch (err) {
      console.log(err.response);
    }
    finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      setTitle("");
      setDescription("");
      setSelectCategory("1");
      setImages([]);
      setLocation({ text: "", coords: null });
    }
  };

  const handleLocation = async(locality) => {
    const geocodeData = await fetchAddressFromCoordinates(locality.coords);
    if (geocodeData) {
      const detailAddress = extractDetailedAddress(geocodeData).fullAddress;
      setLocation({ text: detailAddress, coords: locality.coords });
    } else {
      setLocation({ text: "", coords: locality.coords });
    }
  }
  
  const fetchAddressFromCoordinates = async (coords) => {
    const [latitude, longitude] = coords;
    const apiKey = "78f10438-fb7e-4516-a20a-41c29d8f3b01";
    const url = `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&geocode=${longitude},${latitude}&format=json`;
    try {
      const response = await axios.get(url);
      const data = response.data;
      return data;
    } catch (error) {
      console.error("Error requesting address:", error);
    }
  };

  const extractDetailedAddress = (data) => {
    const featureMembers = data?.response?.GeoObjectCollection?.featureMember;

    if (featureMembers && featureMembers.length > 0) {
      const firstGeoObject = featureMembers[0]?.GeoObject;
      const components =
        firstGeoObject?.metaDataProperty?.GeocoderMetaData?.Address?.Components;
  
      if (components) {
        const city = components.find((comp) => comp.kind === "locality")?.name;
        const district = components.find((comp) => comp.kind === "district")?.name;
        const suburb = components.find((comp) => comp.kind === "suburb")?.name;
        const street = components.find((comp) => comp.kind === "street")?.name;
        const house = components.find((comp) => comp.kind === "house")?.name;
  
        return {
          city: city || "-",
          district: district || "-",
          suburb: suburb || "-",
          street: street || "-",
          house: house || "-",
          fullAddress: [city, district || suburb, street, house]
            .filter(Boolean)
            .join(", ") || "Адрес не найден",
        };
      }
    }
    return {
      city: "-",
      district: "-",
      suburb: "-",
      street: "-",
      house: "-",
      fullAddress: "Адрес не найден",
    };
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-[90vh] bg-blue-100 flex flex-col items-center py-12 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
        <h2 className="text-4xl font-bold text-center text-gray-800">Создать обращение</h2>
        <p className="mt-2 text-lg text-center text-gray-700">
          Опишите проблему и укажите её местоположение.
        </p>

        <div className="mt-6 space-y-4">
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
            value={selectCategory}
            onChange={(e) => setSelectCategory(e.target.value)}
            className="w-full p-3 border rounded-lg"
          >
            <option key="1" value="1">Выберите категорию</option>
            {categories.length > 0 ? categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.title}</option>
            )) : (
              <option key="0" disabled>Категорий нет</option>
            )}
          </select>
          
          <UploadImage 
            fileInputRef={fileInputRef} 
            handleImageUpload={handleImageUpload} 
            images={images} 
            removeImage={removeImage}
          />

          <input
            type="text"
            placeholder="Местоположение"
            value={location.text}
            onChange={(e) => setLocation({...location, text: e.target.value})}
            required
            className="w-full p-3 border rounded-lg"
          />

          <button
            type="button"
            onClick={() => setIsMapOpen(true)}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            Выбрать местоположение
          </button>

          <button
          onClick={handleSubmit}
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            Отправить обращение
          </button>
        </div>
      </div>

      <MapModal isMapOpen={isMapOpen} setIsMapOpen={setIsMapOpen}  hadleLocation={handleLocation}/>
    </div>
  );
};

export default ReportPage;
