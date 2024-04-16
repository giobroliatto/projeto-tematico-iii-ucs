import ecoponto from "../models/Ecoponto.js";

class EcopontoController {

    static async getEcopontos(req, res) {
        try {
            const ecopontosList = await ecoponto.find({});
            res.status(200).send(ecopontosList);
        } catch (err) {
            res.status(500).json({ message: `${err.message} - falha ao buscar ecopontos` })
        }
    }

    static async getEcopontoById(req, res) {
        try {
            const id = req.params.id;
            const filteredEcoponto = await ecoponto.findById(id);
            res.status(200).send(filteredEcoponto);
        } catch (err) {
            res.status(500).json({ message: `${err.message} - falha ao buscar ecoponto. id: ${id}` })
        }
    }

    static async createEcoponto(req, res) {
        try {
            const newEcoponto = await ecoponto.create(req.body);
            res.status(201).json({ message: `ecoponto ${newEcoponto.name} enviado para análise`, ecoponto: newEcoponto })
        } catch (err) {
            res.status(500).json({ message: `${err.message} - falha ao enviar formulário` })
        }
    }

    static async updateEcoponto(req, res) {
        try {
            const id = req.params.id;
            await ecoponto.findByIdAndUpdate(id, req.body);
            res.status(200).send({ message: "atualizado" });
        } catch (err) {
            res.status(500).json({ message: `${err.message} - falha ao atualizar ecoponto. id: ${id}` })
        }
    }

    static async removeEcoponto(req, res) {
        try {
            const id = req.params.id;
            await ecoponto.findByIdAndDelete(id);
            res.status(200).send({ message: "removido" });
        } catch (err) {
            res.status(500).json({ message: `${err.message} - falha ao remover ecoponto. id: ${id}` })
        }
    }
};

export default EcopontoController;