import express from "express";
import UserController from "../controllers/user-controller.js";
import { checkAdminToken } from "../middlewares/authMiddlewares.js";

const routes = express.Router();

routes.post("/user", checkAdminToken, UserController.generateUser);

export default routes;
