import mongoose from "mongoose";

const ecopontoSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true },
    cep: { type: Number, required: true },
    validated: { type: Boolean, default: false }
}, { versionKey: false });

const ecoponto = mongoose.model("ecopontos", ecopontoSchema);

export default ecoponto;