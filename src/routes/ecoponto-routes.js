import express from "express";
import EcopontoController from "../controllers/ecoponto-controller.js";

const routes = express.Router();

routes.get("/ecopontos", EcopontoController.getEcopontos);

export default routes;