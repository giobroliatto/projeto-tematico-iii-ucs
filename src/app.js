import express from "express";
import connectDatabase from "./config/db-connect.js";
import routes from "./routes/index.js";

const connection = await connectDatabase();

connection.on("error", (error) => {
    console.log(error);
});

connection.once("open", () => {
    console.log("db connected")
})

const app = express();
routes(app);

export default app;