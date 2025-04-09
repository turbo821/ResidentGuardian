import React, { useState } from "react";
import MapFilters from "../components/MapPage/MapFilters";
import CityMap from "../components/MapPage/CityMap";

const MapPage = () => {

  return (
    <div className="min-h-[90vh] bg-blue-100 flex flex-col lg:flex-row items-start py-12 px-4">
      <MapFilters />
      <CityMap />
    </div>
  );
};

export default MapPage;
