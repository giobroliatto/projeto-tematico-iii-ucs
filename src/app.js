import express from "express";
import connectDatabase from "./config/db-connect.js";

const connection = await connectDatabase();

connection.on("error", (error) => {
    console.log(error);
});

connection.once("open", () => {
    console.log("conectado ao banco com sucesso")
})

const app = express();

app.get("/", (req, res) => {
    res.status(200).send("ECOCENTERRRR");
});

app.get("/ecopontos", (req, res) => {
    res.status(200).send("")
});

export default app;