import express from "express";
import ecopontos from "./ecoponto-routes.js";

const routes = (app) => {
    app.route("/").get((req, res) => {
        res.status(200).send("Ecocenter");
    })

    app.use(express.json(), ecopontos);
}

export default routes;