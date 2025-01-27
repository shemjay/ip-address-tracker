import React from 'react';
import IPMap from './Components/IPMap';
import Tracker from './Components/Tracker';
import './App.css';

//IP API: https://geo.ipify.org/
//Map API: https://leafletjs.com/

function App() {
  return (
    <>
      <div className='flex flex-col items-center justify-center h-screen w-full font-Rubik text-base'>
        <Tracker />
        <IPMap />
      </div>
    </>
  );
}

export default App;