import { React } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";


const IPMap = () => {
  const position = [51.505, -0.09];
  return (
    <div className="w-full h-screen">
      <MapContainer
        style={{ width: "100%", height: 536 }}
        center={position}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default IPMap;
