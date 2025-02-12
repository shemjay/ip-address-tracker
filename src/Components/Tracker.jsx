import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { useIpContext } from "../Context/IPContext";

const Tracker = () => {
  const [ipUserInput, setIpUserInput] = useState("");
  const { ipInfo, setIpInfo, ipError, setIpError, fetchIPInformation } =
    useIpContext();

  //Fetch IP Information on load
  //UNCOMMENT DURING FINAL SOLUTION
  // useEffect(() => {
  //   fetchIPInformation();
  // }, []);

  //Handle input ip and domain validation
  const validateIPorDomain = (value) => {
    const ipv4Regex =
      /^(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)$/;

    const ipv6Regex =
      /^(([a-fA-F0-9]{1,4}:){7,7}[a-fA-F0-9]{1,4}|([a-fA-F0-9]{1,4}:){1,7}:|([a-fA-F0-9]{1,4}:){1,6}:[a-fA-F0-9]{1,4}|([a-fA-F0-9]{1,4}:){1,5}(:[a-fA-F0-9]{1,4}){1,2}|([a-fA-F0-9]{1,4}:){1,4}(:[a-fA-F0-9]{1,4}){1,3}|([a-fA-F0-9]{1,4}:){1,3}(:[a-fA-F0-9]{1,4}){1,4}|([a-fA-F0-9]{1,4}:){1,2}(:[a-fA-F0-9]{1,4}){1,5}|[a-fA-F0-9]{1,4}:((:[a-fA-F0-9]{1,4}){1,6})|:((:[a-fA-F0-9]{1,4}){1,7}|:)|fe80:(:[a-fA-F0-9]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([a-fA-F0-9]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;

    const domainRegex = /^(?!-)([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,63}(?<!-)$/;
    return (
      ipv4Regex.test(value) ||
      ipv6Regex.test(value) ||
      (value.length <= 255 && domainRegex.test(value))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ipUserInput.trim() === "") {
      setIpInfo(null);
      setIpError("Please enter a valid IP Address or Domain");
      return;
    } else if (ipUserInput.trim() !== "" && validateIPorDomain(ipUserInput)) {
      fetchIPInformation(ipUserInput);
      setIpError(null);
    } else {
      setIpError("Invalid IP Address or Domain");
    }
  };

  const handleInputChange = (e) => {
    setIpUserInput(e.target.value);
    console.log(ipUserInput);
  };

  const handleClear = () => {
    setIpUserInput("");
    setIpError(null);
  };

  return (
    <div className="h-2/5 w-full bg-[url('../../images/pattern-bg-desktop.png')] bg-cover bg-center relative flex items-center justify-center z-20">
      {/* IP Address Input */}
      <div className="flex items-center flex-col gap-2 md:gap-6 font-regular text-center text-VeryDarkGray w-1/2 mb-24">
        <h1 className="text-white text-sm sm:text-lg md:text-2xl lg:text-4xl font-Rubik">
          IP Address Tracker
        </h1>
        <label className="relative overflow-hidden input input-bordered flex items-center bg-white gap-2 w-full font-light">
          <input
            type="text"
            className="grow cursor-pointer"
            placeholder="Search for any IP Address or Domain"
            value={ipUserInput}
            onChange={(e) => handleInputChange(e)}
          />
          <div className="bg-black absolute inset-y-0 right-0 flex ">
            <XMarkIcon
              className="h-full w-6 fill-current text-white cursor-pointer transition duration-300 ease-in-out hover:bg-DarkGray"
              onClick={(e) => handleClear(e)}
            />
            <ArrowRightIcon
              type="submit"
              className="cursor-pointer fill-current text-white w-6 h-full flex items-center justify-center transition duration-300 ease-in-out hover:bg-DarkGray"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
            />
          </div>
          {ipError === null ? null : (
            <div className="absolute bottom-[-50%] left-0">
              <p className="text-red-500 text-[0.75rem]">Error: {ipError}</p>
            </div>
          )}
        </label>
      </div>
      {/* IP Address Input End */}

      {/* IP Address Container Start */}
      <div className="bg-white sm:p-4 md:p-8 lg-p-10 flex items-center justify-center rounded-lg absolute bottom-[-5rem] w-4/5 [box-shadow:5px_10px_6px_-1px_rgba(0,0,0,0.3),0_2px_4px_-2px_rgba(0,0,0,0.1)] ">
        <ul className="flex items-center justify-between w-full gap-0 sm:gap-4 flex-col sm:flex-col md:flex-row lg:flex-row">
          <li className="flex items-center lg:items-left justify-center flex-col md:border-r-2 w-full border-b-2 border-gray-300 ">
            <p className="uppercase text-[0.55rem] lg:text-[0.75rem] font-bold lg:pb-2 w-full text-center sm:text-left tracking-widest">
              IP Address
            </p>
            <div className=" w-full lg:text-left text-center text-VeryDarkGray font-regular">
              {ipError !== null ? (
                "N/A"
              ) : ipInfo ? (
                <span className="text-xs sm:text-sm md:text-md lg:text-lg">
                  {ipInfo.ip}
                </span>
              ) : (
                "N/A"
              )}
            </div>
          </li>
          <li className="flex items-center lg:items-left justify-center flex-col  md:border-r-2 w-full  border-b-2 border-gray-300 ">
            <p className="uppercase text-[0.55rem] lg:text-[0.75rem] font-bold lg:pb-2 w-full text-center sm:text-left tracking-widest">
              Location
            </p>
            <div className=" w-full lg:text-left text-center text-VeryDarkGray font-regular">
              {ipError !== null ? (
                "N/A"
              ) : ipInfo ? (
                <span className="text-xs sm:text-sm md:text-md lg:text-lg">{`${ipInfo.region}, ${ipInfo.country}`}</span>
              ) : (
                "N/A"
              )}
            </div>
          </li>
          <li className="flex items-center lg:items-left justify-center flex-col md:border-r-2 border-b-2 w-full  border-gray-300 ">
            <p className="uppercase text-[0.55rem] lg:text-[0.75rem] font-bold lg:pb-2 w-full text-center sm:text-left tracking-widest">
              Timezone
            </p>
            <div className=" w-full lg:text-left text-center text-VeryDarkGray font-regular">
              {ipError !== null ? (
                "N/A"
              ) : ipInfo ? (
                <span className="text-xs sm:text-sm md:text-md lg:text-lg">
                  {ipInfo.timezone}
                </span>
              ) : (
                "N/A"
              )}
            </div>
          </li>
          <li className="flex items-center lg:items-left justify-center flex-col w-full">
            <p className="uppercase text-[0.55rem] lg:text-[0.75rem] font-bold lg:pb-2 w-full text-center sm:text-left tracking-widest">
              ISP
            </p>
            <div className=" w-full lg:text-left text-center text-VeryDarkGray font-regular">
              {ipError !== null ? (
                "N/A"
              ) : ipInfo ? (
                <span className="text-xs sm:text-sm md:text-md lg:text-lg">
                  {ipInfo.org}
                </span>
              ) : (
                "N/A"
              )}
            </div>
          </li>
        </ul>
      </div>
      {/* IP Address Container End */}
    </div>
  );
};

export default Tracker;
