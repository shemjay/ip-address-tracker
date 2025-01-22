import React from 'react'
import Map from './Components/Map'
import Tracker from './Components/Tracker'
import './App.css'

function App() {

  return (
    <>
      <div className='flex flex-col items-center justify-center h-screen w-full font-Rubik text-base'>
        <Tracker />
        <Map />
      </div>
    </>
  )
}

export default App
