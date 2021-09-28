import express from 'express';
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';

dotenv.config();
connectDB();

const app = express();

app.get('/', (req, res) => {
    res.send('Game server is up.');
})

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));