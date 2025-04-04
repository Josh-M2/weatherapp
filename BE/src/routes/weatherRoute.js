import express from "express";
import {
  getChosenWeather,
  initialWeather,
} from "../controllers/weatherController.js";

const router = express.Router();

router.get("/weather/:country", getChosenWeather);

router.get("/weather/:lat/:lon", initialWeather);

export default router;
