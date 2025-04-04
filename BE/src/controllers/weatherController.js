import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_BASE_URL = "https://api.openweathermap.org/data/2.5/weather?";
const apiKey = process.env.OPENWEATHER_API_KEY;

export const initialWeather = async (req, res) => {
  const { lat, lon } = req.params;
  console.log("lat", lat);
  console.log("lon", lon);

  try {
    const response = await axios.get(API_BASE_URL, {
      params: {
        lat: lat,
        lon: lon,
        appid: apiKey,
        units: "metric",
      },
    });
    if (response) {
      return res.status(200).json(response.data);
    }
  } catch (error) {
    return console.error(error.message);
  }
};

export const getChosenWeather = async (req, res) => {
  const { country } = req.params;

  try {
    // console.log(API_BASE_URL);
    // console.log(apiKey);
    // console.log(country);
    const response = await axios.get(API_BASE_URL, {
      params: {
        q: country,
        appid: apiKey,
        units: "metric",
      },
    });

    if (response) {
      return res.status(200).json(response.data);
    }
  } catch (error) {
    return console.error("error fetching data from openWeather", error.message);
  }
};
