import React, { useState } from "react";
import MapFilters from "../components/MapPage/MapFilters";
import CityMap from "../components/MapPage/CityMap";

const issues = [
  { id: 1, title: "Яма на дороге", status: "В ожидании", image: "https://via.placeholder.com/150", coords: [47.50711227611092, 42.169574985950646] },
  { id: 2, title: "Не работает фонарь", status: "Решено", image: "https://via.placeholder.com/150", coords: [47.51365791023371, 42.160203106641724] },
  { id: 3, title: "Сломанная лавочка", status: "В процессе", image: "https://via.placeholder.com/150", coords: [47.50893304802818, 42.15360487246508] },
  { id: 4, title: "Грязь на тротуаре", status: "В ожидании", image: "https://via.placeholder.com/150", coords: [47.50889670127553, 42.15903366351123] },
  { id: 5, title: "Разбитая урна", status: "Решено", image: "https://via.placeholder.com/150", coords: [47.517204910121826, 42.14567626261708] },
  { id: 6, title: "Неправильная парковка", status: "В процессе", image: "https://via.placeholder.com/150", coords: [47.51168078920165, 42.16112578654285] },
];

const MapPage = () => {

  return (
    <div className="min-h-[85vh] bg-blue-100 flex flex-col lg:flex-row items-start py-12 px-4">
      <MapFilters />
      <CityMap issues={issues}/>
    </div>
  );
};

export default MapPage;
