import mongoose from "mongoose";

const residueSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true },
}, { versionKey: false });

const residue = mongoose.model("residues", residueSchema);

export { residue, residueSchema };