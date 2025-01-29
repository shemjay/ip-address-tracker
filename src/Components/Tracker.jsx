import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import axios from "axios";

const Tracker = () => {
  const [ipUserInput, setIpUserInput] = useState("");
  const [ipError, setIpError] = useState(null);
  const [ipInfo, setIpInfo] = useState(null)

  //Fetch IP Information on load
  useEffect(() => {
    fetchIPInformation();
  }, []);

  const validateIPorDomain = (value) => {
    const ipv4Regex =
    /^(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)$/;

  const ipv6Regex =
    /^(([a-fA-F0-9]{1,4}:){7,7}[a-fA-F0-9]{1,4}|([a-fA-F0-9]{1,4}:){1,7}:|([a-fA-F0-9]{1,4}:){1,6}:[a-fA-F0-9]{1,4}|([a-fA-F0-9]{1,4}:){1,5}(:[a-fA-F0-9]{1,4}){1,2}|([a-fA-F0-9]{1,4}:){1,4}(:[a-fA-F0-9]{1,4}){1,3}|([a-fA-F0-9]{1,4}:){1,3}(:[a-fA-F0-9]{1,4}){1,4}|([a-fA-F0-9]{1,4}:){1,2}(:[a-fA-F0-9]{1,4}){1,5}|[a-fA-F0-9]{1,4}:((:[a-fA-F0-9]{1,4}){1,6})|:((:[a-fA-F0-9]{1,4}){1,7}|:)|fe80:(:[a-fA-F0-9]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([a-fA-F0-9]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;

  const domainRegex =
    /^(?!-)([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,63}(?<!-)$/;
  return ipv4Regex.test(value) || ipv6Regex.test(value) || (value.length <= 255 && domainRegex.test(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ipUserInput.trim() === "") {
      setIpInfo(null)
      setIpError("Please enter a valid IP Address or Domain");
      return;
    } else if (ipUserInput.trim() !== "" && validateIPorDomain(ipUserInput)) {
      fetchIPInformation(ipUserInput);
      setIpError(null)
    } else {
      setIpError("Invalid IP Address or Domain");
    }
  };

  const fetchIPInformation = async (ip = "") => {
    try {
      const response = await axios.get(
        //`https://geo.ipify.org/api/v2/country?apiKey=at_UGACLWcsZmDiEdv4lr633DaWMFHB6&ipAddress=${ip}`
      );
      console.log(response.data);
      setIpInfo(response.data);
      setIpError(null)
    } catch (error) {
      console.error("API Error: ", error);
      setIpError(error.message);
      setIpInfo(null)
    }
  };

  const handleInputChange = (e) => {
    setIpUserInput(e.target.value);
    console.log(ipUserInput);
  };

  const handleClear = () => {
    setIpUserInput("");
    setIpError(null)
  };

  return (
    <div className="h-2/5 w-full bg-[url('../../images/pattern-bg-desktop.png')] bg-cover bg-center relative flex items-center justify-center z-20">
      {/* IP Address Input */}
      <div className="flex items-center flex-col gap-6 font-regular text-VeryDarkGray w-1/2 mb-24">
        <h1 className="text-white text-4xl font-Rubik">IP Address Tracker</h1>
        <label className="relative input input-bordered flex items-center bg-white gap-2 w-full font-light">
          <input
            type="text"
            className="grow cursor-pointer"
            placeholder="Search for any IP Address or Domain"
            value={ipUserInput}
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
          {ipError === null ? null 
        : 
        <div className="absolute bottom-[-50%] left-0">
          <p className="text-red-500 text-[0.75rem]">Error: {ipError}</p>
        </div>
        }
        </label>
        
      </div>
      {/* IP Address Input End */}

      {/* IP Address Container Start */}
      {/*TWEAK THE BOX SHADOW ON THIS */}
      <div className="bg-white p-12 flex items-center justify-center rounded-lg absolute bottom-[-5rem] w-4/5 [box-shadow:0_10px_6px_-1px_rgba(0,0,0,0.3),0_2px_4px_-2px_rgba(0,0,0,0.1)] ">
        <ul className="flex items-center justify-between w-full gap-18 ">
          <li className="mb-4 flex items-center flex-col">
            <p className="uppercase text-[0.75rem] font-bold pb-2 w-full text-left tracking-widest">
              IP Address
            </p>
            <h2 className="text-2xl text-VeryDarkGray font-regular">
            {ipError !== null ? "N/A" : ipInfo ? <span>{ipInfo.ip}</span> : "N/A"}
            </h2>
          </li>
          <li className="mb-4 flex items-center flex-col">
            <p className="uppercase text-[0.75rem] font-bold pb-2 w-full text-left tracking-widest">
              Location
            </p>
            <h2 className="text-2xl text-VeryDarkGray font-regular">
            {ipError !== null ? "N/A" : ipInfo ? <span>{`${ipInfo.location?.country}, ${ipInfo.location?.region}`}</span> : "N/A"}
            </h2>
          </li>
          <li className="mb-4 flex items-center flex-col">
            <p className="uppercase text-[0.75rem] font-bold pb-2 w-full text-left tracking-widest">
              Timezone
            </p>
            <h2 className="text-2xl text-VeryDarkGray font-regular">
              {ipError !== null ? "N/A" : ipInfo ? <span>{ipInfo.location?.timezone}</span> : "N/A"}
            </h2>
          </li>
          <li className="mb-4 flex items-center flex-col">
            <p className="uppercase text-[0.75rem] font-bold pb-2 w-full text-left tracking-widest">
              ISP
            </p>
            <h2 className="text-2xl text-VeryDarkGray font-regular">
              {ipError !== null ? "N/A" : ipInfo ? <span>{ipInfo.isp}</span> : "N/A"}
            </h2>
          </li>
        </ul>
      </div>
      {/* IP Address Container End */}
    </div>
  );
};

export default Tracker;
