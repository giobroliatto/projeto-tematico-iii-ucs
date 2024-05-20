import express from "express";
import ecopoints from "./ecopoint-routes.js";
import residues from "./residue-routes.js";
import auth from "./auth-routes.js";

const routes = (app) => {
    app.route("/").get((req, res) => {
        res.status(200).send("Ecocenter");
    })

    app.use(express.json(), ecopoints, residues, auth);
}

export default routes;