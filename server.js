import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';
import { Server } from 'socket.io';
import authRoutes from './routes/authRoutes.js';
import playerRoutes from './routes/playerRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());

// Routes
app.get('/', (req, res) => {
    res.send('Game server is up.');
});
app.use('/api/auth', authRoutes);
app.use('/api/player', playerRoutes);


// Instantiate server/app with socket
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: process.env.FRONTEND_APP }
});
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// Middlewares
app.use(notFound);
app.use(errorHandler);

// Spin the server up
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
});