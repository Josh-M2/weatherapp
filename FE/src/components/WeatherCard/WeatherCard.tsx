import React, { useState } from "react";
import {
  MagnifyingGlassImage,
  WaterDropletImage,
  WindImage,
  WeatherImage,
} from "../Images/Images";

const WeatherCard: React.FC = () => {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (search.trim() !== "") {
      const currentSearch = search;
      console.log(currentSearch);
      resetSearch();
    }
  };

  const resetSearch = () => {
    setSearch("");
  };

  return (
    <>
      <div className="bg-[#23486A] p-6 rounded-2xl shadow-lg text-white w-80">
        {/* Search Bar */}
        <div className="flex items-center bg-white/20 p-2 rounded-full mb-4">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            className="bg-transparent outline-none text-[#F1EFEC] placeholder-gray-300 w-full px-2"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="!p-0 !bg-transparent !border-0 !focus:outline-none !focus:ring-0 !focus:border-0"
          >
            <MagnifyingGlassImage />
          </button>
        </div>

        {/* Weather Icon */}
        <div className="flex justify-center">
          <WeatherImage url="https://openweathermap.org/img/wn/10d@2x.png" />
        </div>

        {/* Temperature & Location */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-semibold text-[#F1EFEC]">21°C</h1>
          <p className="text-lg text-[#F1EFEC]">New York</p>
        </div>

        {/* Weather Details */}
        <div className="flex justify-between mt-6 text-sm">
          <div className="flex items-center space-x-2">
            <WaterDropletImage />
            <span className="text-[#F1EFEC]">67% Humidity</span>
          </div>
          <div className="flex items-center space-x-2">
            <WindImage />
            <span className="text-[#F1EFEC]">2.06 km/h</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherCard;
