import express from "express";
import EmailController from "../controllers/email-controller.js";
import {checkToken} from "../middlewares/authMiddlewares.js";

const routes = express.Router();

routes.post("/sendEmail", EmailController.sendEmail);

export default routes;