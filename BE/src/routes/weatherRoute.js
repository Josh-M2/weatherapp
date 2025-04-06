import express from "express";
import {
  getChosenWeather,
  initialWeather,
  searchBarSuggestions,
} from "../controllers/weatherController.js";

const router = express.Router();

router.get("/weather/:country", getChosenWeather);

router.get("/weather/:lat/:lon", initialWeather);

router.get("/suggestions/:search", searchBarSuggestions);

export default router;
