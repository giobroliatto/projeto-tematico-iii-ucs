import { residue } from "../models/Residue.js";
import ecopoint from "../models/Ecopoint.js";

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
            res.status(500).json({ message: `${err.message} - falha ao buscar residue` })
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
            res.status(500).json({ message: `${err.message} - falha ao atualizar residue` })
        }
    }

    static async removeResidue(req, res) {
        try {
            const residueId = req.params.id;
    
            const ecopointsWithResidue = await ecopoint.find({ 'residues._id': residueId });
    
            if (ecopointsWithResidue.length > 0) {
                return res.status(400).json({ message: 'Não é possível remover o resíduo pois ele está vinculado a ecopontos.' });
            }
    
            await residue.findByIdAndDelete(residueId);
            
            res.status(200).json({ message: 'Resíduo removido com sucesso.' });
        } catch (error) {
            console.error('Erro ao remover resíduo:', error);
            res.status(500).json({ message: 'Erro interno ao tentar remover o resíduo.' });
        }
    }
    
};

export default ResidueController;