'use strict';

require('dotenv').config();
const port = process.env.PORT_SOCKET || 3001;
const handyData = {
	client: {
		name: 'rama',
		rate: 5,
	},
	handyman: {
		name: 'laith',
		rating: 5,
		price: 20,
	},
	interval: 5000,
};

const ioClient = require('socket.io-client');
const host = `http://localhost:${port}`;
const socket = ioClient.connect(host);
socket.emit('pickHandyman', handyData);
socket.on('handymanIsBusy', apology);
function apology(payload) {
	console.log(
		'sorry the professonal you asked for is busy you can use the services of ',
		payload
	);
}
