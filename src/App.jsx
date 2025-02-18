import React from "react";
import IPMap from "./Components/IPMap";
import Tracker from "./Components/Tracker";
import { IpProvider } from "./Context/IPContext";
import "./App.css";
import "dotenv";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

//IP API: https://geo.ipify.org/ THIS IS THE ONE ASSIGNED BY F.E.M. IT SUCKS LMAO
//IP API: https://ipinfo.io/ DITCHED THE FIRST ONE FOR THIS ONE IT HAS GEOLOCATION INFO
//Map API: https://leafletjs.com/

// For Netlify deployment purposes:
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
  iconRetinaUrl: new URL(
    "leaflet/dist/images/marker-icon-2x.png",
    import.meta.url
  ).href,
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url)
    .href,
});

function App() {
  return (
    <>
      <IpProvider>
        <div className="flex flex-col items-center justify-center h-screen w-full font-Rubik text-base">
          <Tracker />
          <IPMap />
        </div>
      </IpProvider>
    </>
  );
}

export default App;
