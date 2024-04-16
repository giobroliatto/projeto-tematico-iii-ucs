import mongoose from "mongoose";

async function connectDatabase() {
    mongoose.connect("mongodb+srv://admin:ecocenter123@cluster0.6yhvvye.mongodb.net/ecocenter?retryWrites=true&w=majority&appName=Cluster0");

    return mongoose.connection;
}

export default connectDatabase;