import { React, useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useIpContext } from "../Context/IPContext";

const IPMap = () => {
  const { ipInfo } = useIpContext();

  const [position, setPosition] = useState([0, 0]); // Default position is [0, 0]

  useEffect(() => {
    if (ipInfo && ipInfo.loc) {
      const [latitude, longitude] = ipInfo.loc.split(",");
      setPosition([parseFloat(latitude), parseFloat(longitude)]);
    }
  }, [ipInfo]);

  const MapPanToPosition = () => {
    const map = useMap();
    useEffect(() => {
      if (map) {
        map.flyTo(
          position,
          map.getZoom(),
          { animate: true },
          { duration: 2.5 }
        );
      }
    }, [position, map]);
    return null;
  };

  return (
    <div className="w-full h-3/5 relative z-10">
      <MapContainer
        style={{ width: "100%", height: "100%" }} //if leafletjs Map dissapears add a static height value with no parentheses and unit e.g height: 500
        center={position}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapPanToPosition />
        <Marker position={position}>
          <Popup>{`This is ${ipInfo.city}, ${ipInfo.country}`}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default IPMap;
