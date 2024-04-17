import ecopoint from "../models/Ecopoint.js";
import { residue } from "../models/Residue.js";

class EcopointController {

    static async getEcopoints(req, res) {
        try {
            const ecopointsList = await ecopoint.find({});
            res.status(200).send(ecopointsList);
        } catch (err) {
            res.status(500).json({ message: `${err.message} - falha ao buscar ecopontos` })
        }
    }

    static async getEcopointById(req, res) {
        try {
            const id = req.params.id;
            const filteredEcopoint = await ecopoint.findById(id);
            res.status(200).send(filteredEcopoint);
        } catch (err) {
            res.status(500).json({ message: `${err.message} - falha ao buscar ecoponto. id: ${id}` })
        }
    }

    static async createEcopoint(req, res) {
        const newEcopoint = req.body;

        try {
            const filteredResidue = await residue.findById(newEcopoint.residue);
            const completeEcopoint = { ...newEcopoint, residue: { ...filteredResidue._doc } }
            const createdEcopoint = await ecopoint.create(completeEcopoint);

            res.status(201).json({ message: `ecoponto ${newEcopoint.name} enviado para análise`, ecopoint: createdEcopoint })
        } catch (err) {
            res.status(500).json({ message: `${err.message} - falha ao enviar formulário` })
        }
    }

    static async updateEcopoint(req, res) {
        try {
            const id = req.params.id;
            await ecopoint.findByIdAndUpdate(id, req.body);
            res.status(200).send({ message: "atualizado" });
        } catch (err) {
            res.status(500).json({ message: `${err.message} - falha ao atualizar ecoponto. id: ${id}` })
        }
    }

    static async removeEcopoint(req, res) {
        try {
            const id = req.params.id;
            await ecopoint.findByIdAndDelete(id);
            res.status(200).send({ message: "ecoponto removido" });
        } catch (err) {
            res.status(500).json({ message: `${err.message} - falha ao remover ecoponto. id: ${id}` })
        }
    }
};

export default EcopointController;