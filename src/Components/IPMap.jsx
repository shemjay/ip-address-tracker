import { React } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";


const IPMap = () => {
  const position = [51.505, -0.09];
  return (
    <div className="w-full h-3/5 relative z-10">
      <MapContainer
        style={{ width: "100%", height: '100%' }} //if leafletjs Map dissapears add a static height value with no parentheses and unit e.g height: 500
        center={position}
        zoom={13}
        scrollWheelZoom={false}
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
