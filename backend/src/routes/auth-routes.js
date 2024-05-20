import express from "express";
import { verifyAuth } from "../controllers/auth-controller.js";

const routes = express.Router();

routes.post("/auth/login", verifyAuth);

export default routes;

