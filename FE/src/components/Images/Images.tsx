import waterDroplet from "../../assets/water-drop.svg";
import wind from "../../assets/wind.svg";
import magnifyingGlass from "../../assets/magnifying-glass.svg";

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
