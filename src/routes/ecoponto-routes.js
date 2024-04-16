import express from "express";
import EcopontoController from "../controllers/ecoponto-controller.js";

const routes = express.Router();

routes.get("/ecopontos", EcopontoController.getEcopontos);
routes.get("/ecopontos/:id", EcopontoController.getEcopontoById);
routes.post("/ecopontos", EcopontoController.createEcoponto);
routes.put("/ecopontos/:id", EcopontoController.updateEcoponto);
routes.delete("/ecopontos/:id", EcopontoController.removeEcoponto);

export default routes;