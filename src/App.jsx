import React, { useRef, useEffect, useState } from 'react';
import Map from './Components/Map';
import Tracker from './Components/Tracker';
import axios from 'axios';
import './App.css';

function App() {
  const [ipData, setIpData] = useState(null)
  const [ipDataError, setIpDataError] = useState(null)
  const isMounted = useRef(true)

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchIPInformation = async () => {
      try {
        const response = await axios.get(
          // `https://geo.ipify.org/api/v2/country?apiKey=at_UGACLWcsZmDiEdv4lr633DaWMFHB6&ipAddress`,
          { cancelToken: source.token }
        );
        if (isMounted.current) {
          console.log('Here is the Data!: ', response.data, response.data.ip);
          setIpData(response.data)
          setIpDataError(null)
        }
      } catch (error) {
        if (isMounted.current) {
          console.log('Error: ', error);
          setIpDataError('Failed to fetch data: ',error)
        }
      }
    };

    fetchIPInformation();

    return () => {
      isMounted.current = false 
      source.cancel('Component Unmounted!'); 
    };
  }, []); 

  return (
    <>
      <div className='flex flex-col items-center justify-center h-screen w-full font-Rubik text-base'>
        <Tracker ipData={ipData} ipDataError={ipDataError}/>
        <Map />
      </div>
    </>
  );
}

export default App;