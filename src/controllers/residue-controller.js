import { residue } from "../models/Residue.js";

class ResidueController {

    static async getResidues(req, res) {
        try {
            const residuesList = await residue.find({});
            res.status(200).send(residuesList);
        } catch (err) {
            res.status(500).json({ message: `${err.message} - falha ao buscar ecopontos` })
        }
    }

    static async getResidueById(req, res) {
        try {
            const id = req.params.id;
            const filteredResidue = await residue.findById(id);
            res.status(200).send(filteredResidue);
        } catch (err) {
            res.status(500).json({ message: `${err.message} - falha ao buscar residue. id: ${id}` })
        }
    }

    static async createResidue(req, res) {
        try {
            const newResidue = await residue.create(req.body);
            res.status(201).json({ message: `residue ${newResidue.name} enviado para análise`, residue: newResidue })
        } catch (err) {
            res.status(500).json({ message: `${err.message} - falha ao enviar formulário` })
        }
    }

    static async updateResidue(req, res) {
        try {
            const id = req.params.id;
            await residue.findByIdAndUpdate(id, req.body);
            res.status(200).send({ message: "atualizado" });
        } catch (err) {
            res.status(500).json({ message: `${err.message} - falha ao atualizar residue. id: ${id}` })
        }
    }

    static async removeResidue(req, res) {
        try {
            const id = req.params.id;
            await residue.findByIdAndDelete(id);
            res.status(200).send({ message: "removido" });
        } catch (err) {
            res.status(500).json({ message: `${err.message} - falha ao remover residue. id: ${id}` })
        }
    }
};

export default ResidueController;