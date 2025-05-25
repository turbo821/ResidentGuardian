import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import toast from 'react-hot-toast';
import UploadImage from '../components/UploadImage';
import MapModal from '../components/MapModal';
import { fetchAddressFromCoordinates, extractDetailedAddress } from '../functions/addressFunctions';
import { imagesURL } from '../api';

const EditReportPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const fileInputRef = useRef(null);
  
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectCategory, setSelectCategory] = useState("1");
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [location, setLocation] = useState({ text: "", coords: null });
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    fetchAllCategories();
    fetchIssue(id);
    setIsFetching(false);
  }, [id, navigate]);

  const fetchAllCategories = async() => {
    try {
      const response = await api.get("/api/categories");
      setCategories(response.data);
      console.log(response.data)
    }
    catch(err) {
      console.log(err.response);
    }
  }

  const fetchIssue = async(id) => {
    try {
      const response = await api.get(`/api/issues/${id}`);
      const issue = response.data;
      console.log(issue);

      setTitle(issue.title);
      setDescription(issue.description || "");
      setSelectCategory(issue.categoryId);
      setExistingImages(issue.images.map(image => ({ 
        url: image, 
        markedForDeletion: false 
      })));
      setLocation({
        text: issue.location,
        coords: issue.coords
      });
    }
    catch(err) {
      console.log(err.response);
    }
  }

  const handleImageUpload = (e) => {
    setImages(Array.from(e.target.files));
    setErrors((prevErrors) => ({ ...prevErrors, images: "" }));
  };

  const handleSubmit = async () => {
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
    
    const imagesToKeep = existingImages.filter(img => !img.markedForDeletion).map(img => img.url);
    imagesToKeep.forEach((imageToKeep) => {
      formData.append('imagesToKeep', imageToKeep);
    })

    console.log(formData);
    setIsLoading(true);
    try {
      await api.put(`/api/issues/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Обращение успешно обновлено', { duration: 2000 });
      navigate(`/issues/${id}`);
      
    } catch (err) {
      console.error(err);
      toast.error('Ошибка при обновлении', { duration: 2000 });
      setErrors({general: "Произошла ошибка при обновлении обращения"});
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocation = async (locality) => {
    setErrors((prevErrors) => ({ ...prevErrors, location: "" }));
    const geocodeData = await fetchAddressFromCoordinates(locality.coords);
    if (geocodeData) {
      const detailAddress = extractDetailedAddress(geocodeData).fullAddress;
      setLocation({ text: detailAddress, coords: locality.coords });
    } else {
      setLocation({ text: "", coords: locality.coords });
    }
  };
  
  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index) => {
    const updatedImages = [...existingImages];
    updatedImages[index].markedForDeletion = !updatedImages[index].markedForDeletion;
    setExistingImages(updatedImages);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!title) {
      newErrors.title = "Укажите название!";
    }

    if (selectCategory === '1' || selectCategory === '0') {
      newErrors.selectCategory = "Укажите категорию!";
    }
    
    if (!location || !location.text || !location.coords) {
      newErrors.location = "Выберите местоположение на карте!";
    }

    if (images.length === 0 && existingImages.filter(img => !img.markedForDeletion).length === 0) {
      newErrors.images = "Прикрепите хотя бы одно фото!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetErrors = () => {
    setErrors({});
  };

  if (isFetching) {
    return <div className="min-h-[90vh] flex items-center justify-center">Загрузка...</div>;
  }

  return (
    <div className="min-h-[90vh] bg-blue-100 flex flex-col items-center py-12 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
        <h2 className="text-4xl font-bold text-center text-gray-800">Редактировать обращение</h2>
        <p className="mt-2 text-lg text-center text-gray-700">
          {user ? "Обновите информацию о проблеме." : "Для редактирования обращения войдите в свой профиль."}
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
          
          {errors.images && <p className="absolute bottom-[22.5rem] left-40 mt-1 text-sm text-red-600">{errors.images}</p>}
          
          <div className="grid grid-cols-3 gap-2">
            {existingImages.map((img, index) => (
              <div key={img.url} className="relative">
                <img 
                  src={`${imagesURL}/${img.url}`} 
                  alt={`${img.url}`}
                  className={`w-full h-24 object-cover rounded border ${img.markedForDeletion ? 'opacity-50' : ''}`}
                />
                <button
                  onClick={() => removeExistingImage(index)}
                  className={`absolute top-1 right-1 p-1 rounded-full ${img.markedForDeletion ? 'bg-green-500' : 'bg-red-500'} text-white`}
                >
                  {img.markedForDeletion ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>
            ))}
          </div>
          
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
            disabled={isLoading}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition disabled:opacity-50"
          >
            {isLoading ? "Сохранение..." : "Сохранить изменения"}
          </button>
        </div>
      </div>

      <MapModal 
        isMapOpen={isMapOpen} 
        setIsMapOpen={setIsMapOpen}  
        handleLocation={handleLocation}
        initialCoords={location.coords}
      />
    </div>
  );
};

export default EditReportPage;