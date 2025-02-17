import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const IpContext = createContext();

export const useIpContext = () => useContext(IpContext);

export const IpProvider = ({ children }) => {
  const [ipInfo, setIpInfo] = useState(null);
  const [ipError, setIpError] = useState(null);

  const fetchIPInformation = async (ip = "") => {
    const apiKey = import.meta.env.VITE_IPINFO_API_KEY;
    const url = `https://ipinfo.io/${ip}?token=${apiKey}`;

    try {
      const response = await axios.get(url);
      setIpInfo(response.data);
      setIpError(null);
    } catch (error) {
      setIpError(error.message);
      setIpInfo(null);
    }
  };

  return (
    <IpContext.Provider
      value={{ ipInfo, setIpInfo, ipError, setIpError, fetchIPInformation }}
    >
      {children}
    </IpContext.Provider>
  );
};
