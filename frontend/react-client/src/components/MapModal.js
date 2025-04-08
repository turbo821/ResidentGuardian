// import { YMaps, Map, Placemark } from "react-yandex-maps";
import Modal from "react-modal";

Modal.setAppElement("#root");

const MapModal = ({ isMapOpen, setIsMapOpen }) => {
  return (
    <Modal
      isOpen={isMapOpen}
      onRequestClose={() => setIsMapOpen(false)}
      className="bg-white p-4 rounded-lg shadow-lg max-w-3xl w-full mx-auto mt-20"
      overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start"
    >
      <h3 className="text-lg font-bold text-gray-700 mb-4">Выберите место на карте</h3>
      {/* <YMaps>
        <Map
          defaultState={{ center: [47.517641, 42.160875], zoom: 13 }}
          width="100%"
          height="400px"
          onClick={handleMapClick}
        >
          {location.coords && <Placemark geometry={location.coords} />}
        </Map>
      </YMaps> */}
      <button
        onClick={() => setIsMapOpen(false)}
        className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        Закрыть
      </button>
    </Modal>
  )
};

export default MapModal;