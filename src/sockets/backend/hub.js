'use strict';


require('dotenv').config();
const port = process.env.PORT || 3001 ;

const ioServer = require('socket.io')(port);


ioServer.on('connection', (socket) =>{ // connection event emitted automatically by Sockt io
    console.log('Welcome, your socket id:', socket.id); })
    