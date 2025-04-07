import React, { useEffect, useRef, useState } from "react";
import {
  MagnifyingGlassImage,
  WaterDropletImage,
  WindImage,
  WeatherImage,
} from "../Images/Images";
import {
  IconOfWeatherLoader,
  TempAndCityLoader,
  HumidityAndWindSpeedLoader,
} from "../Loaders/Loaders";
import { FetchInitialWeather } from "../../services/WeatherCardAPI/FetchInitialWeatherAPI";
import { SearchedWeather } from "../../services/WeatherCardAPI/SearchedWeatherAPI";
import { SuggestionOfSearchbar } from "../../services/WeatherCardAPI/SuggestionOfSearchbar";
import {
  WeatherModel,
  LocationSuggestionModel,
  LocationLatLonModel,
} from "../../types/WeatherCardTypes";

const WeatherCard: React.FC = () => {
  const [search, setSearch] = useState("Philippines");
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState<WeatherModel | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<LocationLatLonModel | null>(null);
  const [suggestions, setSuggestions] = useState<LocationSuggestionModel[]>([]);
  const [tmpSuggestions, setTmpSuggestions] = useState<
    LocationSuggestionModel[]
  >([]);
  const divSuggestionRef = useRef<HTMLDivElement>(null);

  //if the user clicks outside the reference div the suggestions will be empty (logic)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        divSuggestionRef.current &&
        !divSuggestionRef.current.contains(event.target as Node)
      ) {
        setSuggestions([]);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // search suggestions
  useEffect(() => {
    const delayBound = setTimeout(() => {
      const fetchSuggestions = async () => {
        if (search.length > 2) {
          try {
            const response = await SuggestionOfSearchbar(search);
            if (response) {
              console.log("suggestions: ", response);
              setSuggestions(response);
              setTmpSuggestions(response);
            }
          } catch (error: any) {
            console.error(error.message);
          }
        } else {
          setTmpSuggestions([]);
          setSuggestions([]);
        }
      };
      fetchSuggestions();
    }, 500);

    return () => clearTimeout(delayBound);
  }, [search]);

  // Effect to request the user's location when the component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

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

    //fetch weather by coordinates
    handleInitialLocation();
  }, [location]);

  // const handleTesting = () => {
  //   const response = testing();
  //   console.log(response);
  // };

  const handleInitialLocation = async () => {
    //fetch weather by coordinates
    setLoading(true);

    if (location) {
      try {
        const response = await FetchInitialWeather(
          location?.latitude,
          location?.longitude
        );
        if (response) {
          console.log("Initial weather data", response);
          setWeatherData(response);
        }
      } catch (error: any) {
        console.error(error.message);
      }
    }
    resetSearch();

    setLoading(false);
  };

  const handleSearch = async () => {
    if (search.trim() !== "") {
      setLoading(true);
      setError(null);
      const currentSearch = search;

      try {
        const response = await SearchedWeather(currentSearch);

        if (response) {
          console.log("Searched weather data", response);
          setWeatherData(response);
        }
      } catch (error: any) {
        console.error(error.message);
      }
      resetSearch();
      setLoading(false);
    }
  };

  const resetSearch = () => {
    setSearch("");
  };

  return (
    <>
      <div className="bg-[#23486A] p-6 rounded-2xl shadow-lg text-white w-[293px] h-[360px]">
        {/* Search Bar */}
        <div className="flex items-center bg-white/20 p-2 rounded-full mb-4">
          <div ref={divSuggestionRef}>
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
              onFocus={() => {
                if (search.length > 2 && tmpSuggestions) {
                  setSuggestions(tmpSuggestions);
                }
              }}
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-[#506c8c] rounded shadow text-[#F1EFEC] !w-56 mt-2">
                {suggestions.map((location, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-500 rounded cursor-pointer w-56"
                    onClick={() => {
                      // setSearch(
                      //   `${location.name}, ${location.state}, ${location.country}`
                      // );
                      setLocation({
                        latitude: location.lat,
                        longitude: location.lon,
                      });
                      setSuggestions([]);
                      setTmpSuggestions([]);

                      console.log("location", location);
                    }}
                  >
                    {location.name ? location.name : ""},{" "}
                    {location.state ? location.state : ""},{" "}
                    {location.country ? location.country : ""}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            type="button"
            onClick={handleSearch}
            className="!p-0 !bg-transparent !border-0 !focus:outline-none !focus:ring-0 !focus:border-0"
            tabIndex={-1}
          >
            <MagnifyingGlassImage />
          </button>
        </div>

        {/* Weather Icon */}
        <div className="flex  justify-center my-2">
          {loading ? (
            <IconOfWeatherLoader />
          ) : weatherData ? (
            <WeatherImage
              url={`https://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@2x.png`}
            />
          ) : (
            error && <p className="text-red-500">{error}</p>
          )}
        </div>

        {/* Temperature & Location */}
        <div className="flex flex-col justify-center items-center text-center mb-10 my-2">
          {loading ? (
            <TempAndCityLoader />
          ) : weatherData ? (
            <>
              <h1 className="text-5xl font-semibold text-[#F1EFEC]">
                {weatherData.main.temp.toFixed(0)}°C
              </h1>
              <p className="text-lg text-[#F1EFEC]">{weatherData?.name}</p>
            </>
          ) : (
            error && <p className="text-red-500">{error}</p>
          )}
        </div>

        {/* Weather Details */}
        <div className="flex justify-between mt-6 text-sm">
          <div className="flex items-center space-x-2">
            {loading ? (
              <HumidityAndWindSpeedLoader />
            ) : weatherData ? (
              <>
                <WaterDropletImage />
                <span className="text-[#F1EFEC]">
                  {weatherData?.main?.humidity}% Humidity
                </span>
              </>
            ) : (
              error && <p className="text-red-500">{error}</p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {loading ? (
              <HumidityAndWindSpeedLoader />
            ) : weatherData ? (
              <>
                <WindImage />
                <span className="text-[#F1EFEC]">
                  {weatherData?.wind?.speed} km/h
                </span>
              </>
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
