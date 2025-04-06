import axiosInstance from "../../axiosInstance";

export const SearchedWeather = async (currentSearch: string) => {
  try {
    const response = await axiosInstance.get(`/weather/${currentSearch}`);

    if (response.data) {
      console.log("searched weather data (api)", response.data);
      return response.data;
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
  }
  return null;
};
