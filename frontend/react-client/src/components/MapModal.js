import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import Modal from "react-modal";
import { useState } from "react";

Modal.setAppElement("#root");

const MapModal = ({ isMapOpen, setIsMapOpen, handleLocation = () => {} }) => {
  const defaultState = {
    center: [47.517641, 42.160875],
    zoom: 14,
  };

const [location, setLocation] = useState(null);

  const handleMapClick = (e) => {
    const coords = e.get("coords");
    setLocation({ text: "", coords: coords });
  };

  const handleSetLocation = async () => {
    await handleLocation(location);
    setIsMapOpen(false);
    setLocation(null);
  };

  return (
    <Modal
      isOpen={isMapOpen}
      onRequestClose={() => setIsMapOpen(false)}
      className="bg-white p-4 rounded-lg shadow-lg max-w-3xl w-full mx-auto mt-20"
      overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start"
    >
      <h3 className="text-lg font-bold text-gray-700 mb-4">Выберите место на карте</h3>
      <YMaps query={{ apikey: "ef6ce2bf-6d1d-4567-aaf2-5ca3e0d8da70" }}>
      <Map
          defaultState={defaultState}
          width="100%"
          height="400px"
          onClick={handleMapClick}
        >
          {location?.coords && <Placemark geometry={location.coords} />}
        </Map>
      </YMaps>
      <div className="flex flex-row gap-3 justify-between">
        <button
          onClick={() => setIsMapOpen(false)}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Закрыть
        </button>
        {location && (
          <button
            onClick={() => handleSetLocation()}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Выбрать местоположение
          </button>
        )}

      </div>

    </Modal>
  )
};

export default MapModal;