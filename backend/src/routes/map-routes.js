import express from "express";
import MapController from "../controllers/map-controller.js";

const router = express.Router();

// Rota para obter dados de geolocalização
router.get("/geolocation", MapController.getGeolocationData);

// Rota para obter dados de rota
router.post("/route", MapController.getRouteData);

export default router;
