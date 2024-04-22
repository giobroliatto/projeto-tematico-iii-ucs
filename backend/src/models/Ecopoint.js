import mongoose from "mongoose";
import { residueSchema } from "./Residue.js"

const ecopointSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true },
    cep: { type: Number, required: true },
    schedules: [{
        weekDay: { type: Number, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true }
    }],
    residue: residueSchema,
    validated: { type: Boolean, default: false }
}, { versionKey: false });

const ecopoint = mongoose.model("ecopoints", ecopointSchema);

export default ecopoint;