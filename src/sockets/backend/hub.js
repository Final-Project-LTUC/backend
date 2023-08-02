'use strict';


require('dotenv').config();
const port = process.env.PORT || 3001 ;

const ioServer = require('socket.io')(port);


ioServer.on('connection', (socket) =>{ // connection event emitted automatically by Sockt io
    console.log('Welcome, your socket id:', socket.id)
    socket.on('pickHandyman',pickedHandyman)

    function pickedHandyman(payload) {
        // emiting to the handyman
    ioServer.emit('client-recived', payload)

    console.log(`client requast is successfull with payload:` ,payload.handyman)

     }

     socket.on('busyHandyMan',busy)
     function busy (payload){
        ioServer.emit('handymanIsBusy',payload)

        console.log('handyman is busy')

     }

    ; })