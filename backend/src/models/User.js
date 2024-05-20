import mongoose from "mongoose";

const User = mongoose.model('User', {
    email: String,
    password: String,
    role: String
})

export default User;