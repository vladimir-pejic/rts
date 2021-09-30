import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';
import { Server } from 'socket.io';
import authRoutes from './routes/authRoutes.js';
import playerRoutes from './routes/playerRoutes.js';
import Player from './entities/Player.js';
import Bullet from './entities/Bullet.js';

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

let SOCKET_LIST = {};
let DEBUG = true;

// Instantiate server/app with socket
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: process.env.FRONTEND_APP }
});

io.sockets.on('connection', function(socket){
    socket.id = Math.random();
    SOCKET_LIST[socket.id] = socket;

    Player.onConnect(socket);

    socket.on('disconnect',function(){
        delete SOCKET_LIST[socket.id];
        Player.onDisconnect(socket);
    });

    socket.on('sendMsgToServer',function(data){
        let playerName = ("" + socket.id).slice(2,7);
        for(let i in SOCKET_LIST){
            SOCKET_LIST[i].emit('addToChat', playerName + ': ' + data);
        }
    });

    socket.on('evalServer',function(data){
        if(!DEBUG)
            return;
        let res = eval(data);
        socket.emit('evalAnswer',res);
    });
});

setInterval(function(){
    let pack = {
        player:Player.update(),
        bullet:Bullet.update(),
    }

    for(let i in SOCKET_LIST){
        let socket = SOCKET_LIST[i];
        socket.emit('newPositions',pack);
    }
},1000/25);

// Middlewares
app.use(notFound);
app.use(errorHandler);

// Spin the server up
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
});