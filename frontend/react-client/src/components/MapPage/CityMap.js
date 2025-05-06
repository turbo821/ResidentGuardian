import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { YMaps, Map, Placemark, Clusterer } from "@pbe/react-yandex-maps";
import MiniIssueCard from "./MiniIssueCard";
import { useAuth } from "../../context/AuthContext";

const CityMap = ({ issues }) => {
  const { user } = useAuth();
  const defaultState = {
    center: [47.517641, 42.160875],
    zoom: 14,
  };

  const navigate = useNavigate();
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const mapRef = useRef(null);

  const handleMouseEnter = (issue) => {
    setHoveredPoint(issue);
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  const handlePlacemarkClick = (issue) => {
    navigate(`/issues/${issue.id}`);
  };

  const handleMapClick = async (e) => {
    // ?
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full lg:w-3/4 flex items-center justify-center h-[750px] relative flex-1">
      <YMaps query={{ apikey: "ef6ce2bf-6d1d-4567-aaf2-5ca3e0d8da70" }}>
        <Map
          defaultState={defaultState}
          width="100%"
          height="700px"
          onClick={handleMapClick}
          instanceRef={mapRef}
          options={{
            suppressMapOpenBlock: true,
            // restrictMapArea: true // Sets for one city only!
          }}
        >

          <Clusterer
              options={{
                preset: "islands#invertedVioletClusterIcons",
                groupByCoordinates: true
              }}
            >
            {issues !== null && issues?.length > 0 ? issues.map((issue, index) => (
              <Placemark
                key={index}
                geometry={issue.coords}
                options={{
                  iconColor: issue.color || "#1E90FF"
                }}
                onClick={() => handlePlacemarkClick(issue)}
                onMouseEnter={() => handleMouseEnter(issue)}
                onMouseLeave={handleMouseLeave}
              />
            )) : <></>}
          </Clusterer>
        </Map>
      </YMaps>

      {hoveredPoint && (
        <div
          className="absolute bg-white p-4 rounded-lg shadow-lg border border-gray-300 z-50"
          style={{
            top: '20px',
            left: '20px',
            maxWidth: '300px',
          }}
        >
          <MiniIssueCard issue={hoveredPoint} key={hoveredPoint.id} user={user} />
        </div>
      )}
    </div>
  )
}


export default CityMap;