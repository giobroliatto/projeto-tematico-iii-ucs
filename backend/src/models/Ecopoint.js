import mongoose from "mongoose";
import { residueSchema } from "./Residue.js"

const ecopointSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    email: { type: String, required: true },
    companyName: { type: String, required: true },
    responsibleName: { type: String, required: true },
    responsibleNumber: { type: String, required: true },
    companyCep: { type: Number, required: true },
    companyStreet: { type: String, required: true },
    companyDistrict: { type: String, required: true },
    companyNumber: { type: Number, required: true },
    companyComplement: { type: Number },
    residues: [residueSchema],
    openToPublic: { type: Boolean, required: true },
    schedules: [{
        weekDay: { type: Number, required: true },
        startTime1: { type: String, required: true },
        endTime1: { type: String, required: true },
        startTime2: { type: String },
        endTime2: { type: String }
    }],
    validated: { type: Boolean, default: false }
}, { versionKey: false });

const ecopoint = mongoose.model("ecopoints", ecopointSchema);

export default ecopoint;