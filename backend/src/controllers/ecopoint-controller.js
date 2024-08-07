import ecopoint from "../models/Ecopoint.js";
import { residue } from "../models/Residue.js";

class EcopointController {

    static async getEcopoints(req, res) {
        try {
            const { validated } = req.query;
            const filter = {};

            if (validated !== undefined) {
                filter.validated = validated === 'true';
            }

            const ecopointsList = await ecopoint.find(filter);
            res.status(200).send(ecopointsList);
        } catch (err) {
            res.status(500).json({ message: `${err.message} - falha ao buscar ecopontos` });
        }
    }

    static async getEcopointById(req, res) {
        try {
            const id = req.params.id;
            const filteredEcopoint = await ecopoint.findById(id);
            res.status(200).send(filteredEcopoint);
        } catch (err) {
            res.status(500).json({ message: `${err.message} - falha ao buscar ecoponto.` })
        }
    }

    static async getEcopointsByEmail(req, res) {
        try {
            const email = req.params.email;
            const filteredEcopoints = await ecopoint.find({ email: email });
            res.status(200).send(filteredEcopoints);
        } catch (err) {
            res.status(500).json({ message: `${err.message} - falha ao buscar ecopontos pelo email` });
        }
    }

    static async createEcopoint(req, res) {
        const newEcopoint = req.body;
    
        try {
            const filteredResidues = await residue.find({ '_id': { $in: newEcopoint.residues } });
            
            if (filteredResidues.length !== newEcopoint.residues.length) {
                return res.status(400).json({ message: "Um ou mais resíduos não foram encontrados" });
            }
    
            const completeEcopoint = { ...newEcopoint, residues: filteredResidues };
    
            const createdEcopoint = await ecopoint.create(completeEcopoint);
    
            res.status(201).json({ message: `Ecoponto ${newEcopoint.companyName} enviado para análise`, ecopoint: createdEcopoint });
        } catch (err) {
            res.status(500).json({ message: `${err.message} - falha ao enviar formulário` });
        }
    }

    static async updateEcopoint(req, res) {
        const id = req.params.id;
        try {
            if (req.body.residues && Array.isArray(req.body.residues)) {
                const residues = await residue.find({ '_id': { $in: req.body.residues } });
                
                if (residues.length !== req.body.residues.length) {
                    return res.status(400).json({ message: "um ou mais resíduos não foram encontrados" });
                }
                
                req.body.residues = residues;
            }
            
            await ecopoint.findByIdAndUpdate(id, req.body);
            res.status(200).send({ message: "atualizado" });
        } catch (err) {
            res.status(500).json({ message: `${err.message} - falha ao atualizar ecoponto` });
        }
    }

    static async removeEcopoint(req, res) {
        try {
            const id = req.params.id;
            await ecopoint.findByIdAndDelete(id);
            res.status(200).send({ message: "ecoponto removido" });
        } catch (err) {
            res.status(500).json({ message: `${err.message} - falha ao remover ecoponto` })
        }
    }
};

export default EcopointController;