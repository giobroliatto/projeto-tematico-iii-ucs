import express from "express";
import EcopointController from "../controllers/ecopoint-controller.js";

const routes = express.Router();

routes.get("/ecopoints", EcopointController.getEcopoints);
routes.get("/ecopoints/:id", EcopointController.getEcopointById);
routes.post("/ecopoints", EcopointController.createEcopoint);
routes.put("/ecopoints/:id", EcopointController.updateEcopoint);
routes.delete("/ecopoints/:id", EcopointController.removeEcopoint);

export default routes;