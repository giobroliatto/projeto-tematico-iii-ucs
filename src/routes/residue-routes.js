import express from "express";
import ResidueController from "../controllers/residue-controller.js";

const routes = express.Router();

routes.get("/residues", ResidueController.getResidues);
routes.get("/residues/:id", ResidueController.getResidueById);
routes.post("/residues", ResidueController.createResidue);
routes.put("/residues/:id", ResidueController.updateResidue);
routes.delete("/residues/:id", ResidueController.removeResidue);

export default routes;