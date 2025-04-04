import React, { useEffect, useState } from "react";
import {
  MagnifyingGlassImage,
  WaterDropletImage,
  WindImage,
  WeatherImage,
} from "../Images/Images";
import axiosInstance from "../../axiosInstance";

const WeatherCard: React.FC = () => {
  const [search, setSearch] = useState("London");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  // Effect to request the user's location when the component mounts
  useEffect(() => {
    // Check if geolocation is available in the browser
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Get the latitude and longitude from the position object
          const { latitude, longitude } = position.coords;
          resetSearch();
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Geolocation permission denied or failed.", error);
          handleSearch(); // Trigger search if geolocation is denied or fails
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      handleSearch();
    }
  }, []);

  useEffect(() => {
    // console.log("location", location?.latitude);
    // console.log("location", location?.longitude);

    handleInitialLocation();
  }, [location]);

  const handleInitialLocation = async () => {
    if (location) {
      try {
        const response = await axiosInstance.get(
          `/weather/${location?.latitude}/${location?.longitude}`
        );

        if (response) {
          console.log("weather data", response.data);
          setWeatherData(response.data);
        }
      } catch (error: any) {
        if (error.response) {
          if (error.response.status === 404) {
            console.error("API endpoint not found");
          } else {
            console.error(`HTTP Error: ${error.response.status}`);
          }
        } else if (error.request) {
          console.error("Error: No response received from server");
        } else {
          console.error("Error:", error.message);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSearch = async () => {
    if (search.trim() !== "") {
      setLoading(true);
      setError(null);
      const currentSearch = search;

      try {
        const response = await axiosInstance.get(`/weather/${currentSearch}`);

        if (response) {
          console.log("weather data", response.data);
          setWeatherData(response.data);
        }
      } catch (error: any) {
        if (error.response) {
          if (error.response.status === 404) {
            console.error("API endpoint not found");
          } else {
            console.error(`HTTP Error: ${error.response.status}`);
          }
        } else if (error.request) {
          console.error("Error: No response received from server");
        } else {
          console.error("Error:", error.message);
        }
      } finally {
        setLoading(false);
      }

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
          {loading ? (
            <p className="text-white">Loading...</p>
          ) : weatherData ? (
            <WeatherImage
              url={`https://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@2x.png`}
            />
          ) : (
            error && <p className="text-red-500">{error}</p>
          )}
        </div>

        {/* Temperature & Location */}
        <div className="text-center mb-10">
          {loading ? (
            <h1 className="text-5xl font-semibold text-[#F1EFEC]">
              Loading...
            </h1>
          ) : weatherData ? (
            <h1 className="text-5xl font-semibold text-[#F1EFEC]">
              {weatherData.main.temp}°C
            </h1>
          ) : (
            error && <p className="text-red-500">{error}</p>
          )}

          {loading ? (
            <p className="text-lg text-[#F1EFEC]">Loading...</p>
          ) : weatherData ? (
            <p className="text-lg text-[#F1EFEC]">{weatherData?.name}</p>
          ) : (
            error && <p className="text-red-500">{error}</p>
          )}
        </div>

        {/* Weather Details */}
        <div className="flex justify-between mt-6 text-sm">
          <div className="flex items-center space-x-2">
            <WaterDropletImage />
            {loading ? (
              <span className="text-[#F1EFEC]">Loading...</span>
            ) : weatherData ? (
              <span className="text-[#F1EFEC]">
                {weatherData?.main?.humidity}% Humidity
              </span>
            ) : (
              error && <p className="text-red-500">{error}</p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <WindImage />
            {loading ? (
              <span className="text-[#F1EFEC]">Loading...</span>
            ) : weatherData ? (
              <span className="text-[#F1EFEC]">
                {weatherData?.wind?.speed} km/h
              </span>
            ) : (
              error && <p className="text-red-500">{error}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherCard;
