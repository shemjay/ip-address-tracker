import React from "react";
import IPMap from "./Components/IPMap";
import Tracker from "./Components/Tracker";
import { IpProvider } from "./Context/IPContext";
import "./App.css";
import "dotenv";

//IP API: https://geo.ipify.org/ THIS IS THE ONE ASSIGNED BY F.E.M. IT SUCKS LMAO
//IP API: https://ipinfo.io/ DITCHED THE FIRST ONE FOR THIS ONE IT HAS GEOLOCATION INFO
//Map API: https://leafletjs.com/

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
