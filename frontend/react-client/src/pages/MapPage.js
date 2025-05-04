import React, { useState, useEffect } from "react";
import MapFilters from "../components/MapPage/MapFilters";
import CityMap from "../components/MapPage/CityMap";
import api from "../api";

const MapPage = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetchAllIssues(); 
  }, []);

  const fetchAllIssues = async() => {
    try {
      const response = await api.get("/api/issues");
      setIssues(response.data.items);
    }
    catch(err) {
      console.log(err.response);
    }
  }

  return (
    <div className="min-h-[85vh] bg-blue-100 flex flex-col lg:flex-row items-start py-12 px-4">
      <MapFilters setIssues={setIssues}/>
      <CityMap issues={issues} />
    </div>
  );
};

export default MapPage;
