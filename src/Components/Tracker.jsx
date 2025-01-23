import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import axios from "axios";

const Tracker = () => {
  const [ipAddress, setIpAddress] = useState("");
  const [ipError, setIpError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ipAddress.trim() === "") {
      console.log("Please enter a valid IP Address");
      return;
    } else {
      fetchIPAddress();
    }
  };

  const fetchIPAddress = async () => {
    try {
      const response = await fetch(
        `https://geo.ipify.org/api/v2/country?apiKey=at_UGACLWcsZmDiEdv4lr633DaWMFHB6&ipAddress=${ipAddress}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      setIpAddress(data.ip);
      return data;
    } catch (error) {
      setIpError(error);
      console.log("Error fetching first API", error);
    }
  };

  const handleInputChange = (e) => {
    setIpAddress(e.target.value);
    console.log(ipAddress);
  };

  const handleClear = () => {
    setIpAddress("");
  };

  return (
    <div className="h-2/3 w-full bg-[url('../../images/pattern-bg-desktop.png')] bg-cover bg-center relative flex items-center justify-center">
      {/* IP Address Input */}
      <div className="flex items-center flex-col gap-6 font-regular text-VeryDarkGray w-1/2 mb-24">
        <h1 className="text-white text-4xl font-Rubik">IP Address Tracker</h1>
        <label className="input input-bordered flex items-center bg-white gap-2 w-full font-light overflow-hidden">
          <input
            type="text"
            className="grow"
            placeholder="Search for any IP Address or Domain"
            value={ipAddress}
            onChange={(e) => handleInputChange(e)}
          />
          <div className="bg-black border-2 border-red flex items-center justify-between w-12 h-12">
            <ArrowRightIcon
              className="cursor-pointer fill-current text-white w-6 h-full flex items-center justify-center"
              onClick={(e) => handleSubmit(e)}
            />
            <XMarkIcon
              className="h-full w-6 fill-current text-white cursor-pointer"
              onClick={(e) => handleClear(e)}
            />
          </div>
        </label>
      </div>
      {/* IP Address Input End */}

      {/* IP Address Container Start */}
      {/*TWEAK THE BOX SHADOW ON THIS */}<div className="bg-white p-12 flex items-center justify-center rounded-lg absolute bottom-[-5rem] w-4/5 [box-shadow:0_10px_6px_-1px_rgba(0,0,0,0.3),0_2px_4px_-2px_rgba(0,0,0,0.1)]">
        <ul className="flex items-center justify-between w-full gap-18">
          <li className="mb-4 flex items-center flex-col">
            <p className="uppercase text-[0.75rem] font-bold pb-2 w-full text-left tracking-widest">IP Address</p>
            <h2 className="text-2xl text-VeryDarkGray font-regular">192.212.174.101</h2>
          </li>
          <li className="mb-4 flex items-center flex-col">
            <p className="uppercase text-[0.75rem] font-bold pb-2 w-full text-left tracking-widest">Location</p>
            <h2 className="text-2xl text-VeryDarkGray font-regular">Brooklyn, NY 10001</h2>
          </li>
          <li className="mb-4 flex items-center flex-col">
            <p className="uppercase text-[0.75rem] font-bold pb-2 w-full text-left tracking-widest">Timezone</p>
            <h2 className="text-2xl text-VeryDarkGray font-regular">UTC-05:00</h2>
          </li>
          <li className="mb-4 flex items-center flex-col">
            <p className="uppercase text-[0.75rem] font-bold pb-2 w-full text-left tracking-widest">ISP</p>
            <h2 className="text-2xl text-VeryDarkGray font-regular">SpaceX Starlink</h2>
          </li>
        </ul>
      </div>
      {/* IP Address Container End */}
    </div>
  );
};

export default Tracker;
