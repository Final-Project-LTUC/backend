const socketIO = require('socket.io');

module.exports = (server) => {
	const IO = socketIO(server);

	const users = {};

	IO.on('connection', (socket) => {
		console.log(`new user ${socket.id}`);

		socket.on('signIn', (payload) => {
			users[payload.userId] = socket.id;
			console.log(users);
		});

		socket.on('pickHandyman', (payload) => {
			console.log(`client ${payload.handyData.client.name} request is successful with payload:`, payload.handyData.handyman);

			let socketId = users[payload.reciverId];
			IO.to(socketId).emit('client-recived', payload);
			socketId = null;
		});

		socket.on('busyHandyMan', busy);
		function busy(payload) {
			console.log('handyman is busy');

			let socketId = users[payload.reciverId];
			IO.to(socketId).emit('handymanIsBusy', payload);
			socketId = null;
		}

		socket.on('returnStageOne', returningPayment);
		function returningPayment(payload) {
			console.log(`returning amount: ${payload.payment} to client ${payload.client.name}`);
		}
		socket.on('choiceToContinue', choiceToContinueLate);
		function choiceToContinueLate(payload) {

			IO.emit('choiceToContinue', payload);

			if (!payload.client.choice) {
				payload.payback = true;
				console.log(`Client chose not to continue, returning the amount of ${payload.payment} to client named ${payload.client.name}`);
				IO.emit('returendYouMoney', payload);
			}
		}

		socket.on('paidTotal', startWorking);
		function startWorking(payload) {
			console.log('amount paid', payload.costEstimate);

			let socketId = users[payload.reciverId];
			IO.to(socketId).emit('startWorking', payload);
			socketId = null;
		}

		socket.on('serviceRejected', () => {
			console.log('rejected');
			IO.emit('serviceRejected');
		});

		socket.on('ontimeorless', finishedOnTime);
		function finishedOnTime(payload) {
			const oneHoursFixer = payload.costEstimate.expectedWorkTime - payload.deffrance / payload.costEstimate.expectedWorkTime;
			payload.costEstimate.hourlyPayment = payload.costEstimate.hourlyRate * oneHoursFixer;
			console.log('::::::::test ', payload.costEstimate.hourlyPayment);
			console.log('third stage payment ', payload.costEstimate.hourlyPayment);

			let socketId = users[payload.senderId];
			IO.to(socketId).emit('lastPayment', payload);
			socketId = null;

			socketId = users[payload.reciverId];
			IO.to(socketId).emit('lastPayment', payload);
			socketId = null;
		}

		socket.on('moreCharge', finishedlate);
		function finishedlate(payload) {
			const oneHoursFixer = (payload.costEstimate.expectedWorkTime + payload.deffrance) / payload.costEstimate.expectedWorkTime;
			payload.costEstimate.hourlyPayment = payload.costEstimate.hourlyRate * oneHoursFixer;
			console.log('::::::::test ', payload.costEstimate.hourlyPayment);
			console.log('third stage payment ', payload.costEstimate.hourlyPayment);

			let socketId = users[payload.senderId];
			IO.to(socketId).emit('lastPayment', payload);
			socketId = null;

			socketId = users[payload.reciverId];
			IO.to(socketId).emit('lastPayment', payload);
			socketId = null;
		}


		socket.on('paidrdStage', confirmedpayment);
		function confirmedpayment(payload) {
			console.log('paid for this operation', payload.costEstimate);

			let socketId = users[payload.reciverId];
			IO.to(socketId).emit('paidrdStage', payload);
			socketId = null;
		}

		socket.on('reviewOfHandyman', sendingServer);
		function sendingServer(payload) {
			console.log(`the operator ${payload.handyman.name} got the rating of ${payload.handyman.review} for this operation`);
			// logic to send to the server here
		}

		socket.on('reviewOfclient', sendingCleintToServer);
		function sendingCleintToServer(payload) {
			console.log(`the client ${payload.client.name} got the rating of ${payload.client.review} for this interaction`);
			// logic to send to the server here
		}


		socket.on('signOut', (payload) => {
			delete users[payload.userId];
			console.log(users);
		});
	});

	return IO;
};
