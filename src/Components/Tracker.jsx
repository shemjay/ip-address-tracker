import React from "react";
import { ReactComponent as IconArrow } from "../../images/icon-arrow.svg";

const Tracker = () => {
  return (
    <div className="h-2/4 w-full bg-[url('../../images/pattern-bg-desktop.png')] bg-cover bg-center relative flex items-center justify-center">
      {/* IP Address Input */}
      <div className="flex items-center flex-col gap-6 font-regular text-VeryDarkGray w-1/2 ">
        <h1 className="text-white text-4xl font-Rubik">IP Address Tracker</h1>
        <label className="input input-bordered flex items-center bg-white gap-2 w-full font-light">
          <input
            type="text"
            className="grow"
            placeholder="Search for any IP Address or Domain"
          />
          <IconArrow className="cursor-pointer text-center flex items-center justify-center w-6 h-full bg-VeryDarkGray" />
        </label>
      </div>
      {/* IP Address Input End */}
    </div>
  );
};

export default Tracker;
