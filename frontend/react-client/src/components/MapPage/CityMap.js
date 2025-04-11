import { useState,   useRef } from "react";
import { YMaps, Map, Placemark, Clusterer } from "@pbe/react-yandex-maps";
import "./CityMap.css";

const CityMap = ({ issues }) => {
  const defaultState = {
    center: [47.517641, 42.160875],
    zoom: 14,
  };

  const [hoveredPoint, setHoveredPoint] = useState(null);
  const mapRef = useRef(null);

  const handleMapClick = async (e) => {
    const coords = e.get("coords");
    alert(`${coords[0]} ${coords[1]}`);
  };

  const handleMouseEnter = (issue) => {
    if (mapRef.current) {
      const mapInstance = mapRef.current;
      try {
        const globalPixels = mapInstance.options.get("projection").toGlobalPixels(
          [issue.coords[0], issue.coords[1]],
          mapInstance.getZoom()
        );
        const screenPosition = mapInstance.converter.globalToPage(globalPixels);
        setHoveredPoint({
          ...issue,
          screenPosition,
        });

      } catch (error) {
        console.error("Error converting coordinates:", error);
      }
    }
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  const handlePlacemarkClick = (issue) => {
    alert(`${issue.coords[0]}, ${issue.coords[1]}`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full lg:w-3/4 flex items-center justify-center h-[750px] map-container">
      <YMaps query={{ apikey: "ef6ce2bf-6d1d-4567-aaf2-5ca3e0d8da70" }}>
        <Map
          defaultState={defaultState}
          state={{ ...defaultState, center: defaultState.center }}
          width="100%"
          height="100%"
          onClick={handleMapClick}
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
            {issues.map((issue, index) => (
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
            ))}
          </Clusterer>
        </Map>
      </YMaps>

      {hoveredPoint && hoveredPoint.screenPosition && (
        <div
          className="hovered-point-window"
          style={{
            top: `${hoveredPoint.screenPosition[1] - 230}px`,
            left: `${hoveredPoint.screenPosition[0] + 20}px`,
          }}
        >
          <p><strong>{hoveredPoint.title}</strong></p>
          <p>{hoveredPoint?.status}</p>
          <p>Местонахождение: {`${hoveredPoint.coords[0]}, ${hoveredPoint.coords[1]}`}</p>
        </div>
      )}
    </div>
  )
}

export default CityMap;