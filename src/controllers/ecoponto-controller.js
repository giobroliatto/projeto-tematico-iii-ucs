import ecoponto from "../models/Ecoponto.js";

class EcopontoController {

    static async getEcopontos(req, res) {
        const ecopontosList = await ecoponto.find({});
        res.status(200).send(ecopontosList);
    }

    static async createEcoponto(req, res) {
        try {
            const newEcoponto = await ecoponto.create(req.body);
            res.status(201).json({ message: `ecoponto ${newEcoponto} enviado para análise`, ecoponto: newEcoponto })
        } catch (err) {
            res.status(500).json({ message: `${err.message} - falha ao enviar formulário` })
        }
    }

};

export default EcopontoController;