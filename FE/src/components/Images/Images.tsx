import waterDroplet from "../../assets/water-drop.svg";
import wind from "../../assets/wind.svg";
import magnifyingGlass from "../../assets/magnifying-glass.svg";

import { motion } from "framer-motion";

export const WaterDropletImage = () => {
  return <img className="h-6" src={waterDroplet} alt="humidity" />;
};

export const WindImage = () => {
  return <img className="h-6" src={wind} alt="Wind" />;
};

export const MagnifyingGlassImage = () => {
  return <img className="h-6 mr-2" src={magnifyingGlass} alt="Wind" />;
};

export const WeatherImage: React.FC<{ url: string }> = ({ url }) => {
  return <img className="" src={url} alt="Wind" />;
};

export const IconOfWeatherLoader = () => {
  return (
    <div className="relative w-60 h-[100px] bg-[#506c8c] rounded-lg overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
    </div>
  );
};

export const TempAndCityLoader = () => {
  return (
    <div className="relative w-60 h-[84px] bg-[#506c8c] rounded-lg overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
    </div>
  );
};

export const HumidityLoader = () => {
  return (
    <div className="relative w-60 h-[84px] bg-[#506c8c] rounded-lg overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
    </div>
  );
};

export const HumidityAndWindSpeedLoader = () => {
  return (
    <div className="relative w-28 h-6 bg-[#506c8c] rounded-lg overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
    </div>
  );
};
