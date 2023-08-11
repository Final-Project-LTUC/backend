'use strict';



const socketIO = require('socket.io');

module.exports = (server) => {
	const IO = socketIO(server);

	const users = {};

	IO.on('connection', (socket) => {
		console.log(`new user ${socket.id}`);

    ioServer.on('connection', (socket) => {
        // connection event emitted automatically by Socket.io
        console.log('Welcome, your socket id:', socket.id);

        socket.on('pickHandyman', pickedHandyman);
        function pickedHandyman(payload) {
            // Emitting to the handyman
            ioServer.emit('client-recived', payload);

            console.log(`Client request is successful with payload:`, payload.handyman);
        }

        socket.on('busyHandyMan', busy);
        function busy(payload) {
            ioServer.emit('handymanIsBusy', payload);
            console.log('Handyman is busy');
        }
    });

    return ioServer;
};
