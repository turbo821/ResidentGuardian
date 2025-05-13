import { useState, useEffect, useRef } from "react";
import MapModal from "../components/MapModal";
import api from "../api";
import UploadImage from "../components/ReportPage/UploadImage";
import { fetchAddressFromCoordinates, extractDetailedAddress } from "../functions/addressFunctions";
import { useAuth } from "../context/AuthContext";

const ReportPage = () => {
  const { user } = useAuth();
  const fileInputRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectCategory, setSelectCategory] = useState("1");
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState({ text: "", coords: null });
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
    setErrors((prevErrors) => ({ ...prevErrors, "images": "" }));
  };

  const handleSubmit = async() => {
    resetErrors();
    if (!validateForm()) {
      return;
    }
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description || "");
    formData.append('categoryId', selectCategory);
    formData.append('location', location.text);
    formData.append('pointLatitude', location.coords !== null ? location?.coords[0] : null);
    formData.append('pointLongitude', location.coords !== null ? location?.coords[1] : null);
    
    images.forEach((image) => {
      formData.append(`Images`, image);
    });
    
    setIsLoading(true);
    try {
      await api.post('/api/issues', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

    } catch (err) {
      setErrors({general: "Произошла ошибка при отправлении обращения"});
    }
    finally {
      setIsLoading(false);
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
    setErrors((prevErrors) => ({ ...prevErrors, "location": "" }));
    const geocodeData = await fetchAddressFromCoordinates(locality.coords);
    if (geocodeData) {
      const detailAddress = extractDetailedAddress(geocodeData).fullAddress;
      setLocation({ text: detailAddress, coords: locality.coords });
    } else {
      setLocation({ text: "", coords: locality.coords });
    }
  }
  
  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!title) {
      newErrors.title = "Укажите название!";
    }

    if(selectCategory === '1' 
      || selectCategory === '0' ) {
      newErrors.selectCategory = "Укажите категорию!";
    }
    if(!location || !location.text || !location.coords) {
      newErrors.location = "Выберите местоположение на карте!";
    }

    if (images.length === 0) {
      newErrors.images = "Прикрепите фото!"
    }

    console.log(newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetErrors = () => {
    setErrors({});
  };

  return (
    <div className="min-h-[90vh] bg-blue-100 flex flex-col items-center py-12 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
        <h2 className="text-4xl font-bold text-center text-gray-800">Создать обращение</h2>
        <p className="mt-2 text-lg text-center text-gray-700">
          {user ? "Опишите проблему и укажите её местоположение." : "Для создания и отправления обращения войдите в свой профиль."}
        </p>

        <div className="mt-6 space-y-6 relative">
          {errors.title && <p className="absolute mt-0 text-sm text-red-600">{errors.title}</p>}
          <input
            type="text"
            placeholder="Название проблемы"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              setErrors((prevErrors) => ({ ...prevErrors, title: "" }));
            }}
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

          {errors.selectCategory && <p className="absolute top-52 mt-1 text-sm text-red-600">{errors.selectCategory}</p>}
          <select
            value={selectCategory}
            onChange={(e) => {
              setSelectCategory(e.target.value)
              setErrors((prevErrors) => ({ ...prevErrors, selectCategory: "" }));
            }}
            className="w-full p-3 border rounded-lg"
          >
            <option key="1" value="1">Выберите категорию</option>
            {categories.length > 0 ? categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.title}</option>
            )) : (
              <option key="0" disabled>Категорий нет</option>
            )}
          </select>
          {errors.images && <p className="absolute bottom-30 left-40 mt-1 text-sm text-red-600">{errors.images}</p>}
          <UploadImage 
            fileInputRef={fileInputRef} 
            handleImageUpload={handleImageUpload} 
            images={images} 
            removeImage={removeImage}
          />
          {errors.location && <p className="absolute bottom-[7.5rem] mt-1 text-sm text-red-600">{errors.location}</p>}
          <input
            type="text"
            placeholder="Местоположение"
            value={location.text}
            onChange={(e) => {
              setLocation({...location, text: e.target.value})
              setErrors((prevErrors) => ({ ...prevErrors, location: "" }));
          }}
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

          {errors.general && <p className="absolute bottom-12 text-sm text-red-600">{errors.general}</p>}
          <button
          onClick={handleSubmit}
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            { isLoading ? "Загрузка..." : "Отправить обращение" }
          </button>
        </div>
      </div>

      <MapModal isMapOpen={isMapOpen} setIsMapOpen={setIsMapOpen}  hadleLocation={handleLocation}/>
    </div>
  );
};

export default ReportPage;
