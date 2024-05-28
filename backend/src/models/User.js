import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'ecopointer' }
});

const user = mongoose.model('user', userSchema);

export { user, userSchema };