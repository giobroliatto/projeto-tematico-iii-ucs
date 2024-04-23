import express from 'express';
import connectDatabase from './config/db-connect.js';
import routes from './routes/index.js';
import cors from 'cors'; 

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const connection = await connectDatabase();

connection.on('error', (error) => {
    console.log(error);
});

connection.once('open', () => {
    console.log('db connected');
});

app.use(express.json());
routes(app);

export default app;
