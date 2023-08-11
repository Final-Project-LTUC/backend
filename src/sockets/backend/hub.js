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
		socket.on('schedualeAndpayment', handlePaymentAndScheduale) // handman
		function handlePaymentAndScheduale(payload) {
			// distance calculations here
			payload.status = true;  // here it should be true if the payment logic worked false if payment logic failed and the transaction failed
			let socketId = users[payload.reciverId];
			IO.to(socketId).emit("transaction", payload)
			socketId = null;

			let socketIds = users[payload.senderId];
			IO.to(socketIds).emit("transaction", payload)
		}
		socket.on('arrived', arrivedOrLate)
		function arrivedOrLate(payload) {
			if (payload.handyData.onTime === true) {
				console.log('arrived on time ready for work', payload)
				let socketId = users[payload.reciverId];
				IO.to(socketId).emit("arrived", payload)
				socketId = null;
			}
			else {
				console.log('arrived late and wating for client response ') // add logic for canceling if the user wants and to get money back to the user
				// ioServer.emit('arrived',payload)
				// console.log('arrived on time ready for work', payload)
				let socketId = users[payload.reciverId];
				IO.to(socketId).emit("late", payload)
				socketId = null;

			}

		}

		// from the handyman 
		socket.on('costestimate', estimate) // log the price and emmit to the client and handy man if accepted
		function estimate(payload) {
			console.log('product costs ', payload.handyData.costEstimate.price)
			let socketId = users[payload.reciverId];
			IO.to(socketId).emit("costestimate", payload)
			socketId = null;
		}


		socket.on('busyHandyMan', busy);
		function busy(payload) {
			console.log('handyman is busy');

			let socketId = users[payload.reciverId];
			IO.to(socketId).emit('handymanIsBusy', payload);
			socketId = null;
		}

		socket.on('returnStageOne', returningPayment);
		function returningPayment(payload) {
			console.log(`returning amount: ${payload.handyData.payment} to client ${payload.handyData.client.name}`);
		}

		socket.on('choiceToContinue', choiceToContinueLate);
		function choiceToContinueLate(payload) {


			// IO.emit('choiceToContinue', payload);

			if (!payload.handyData.client.choice) {
				payload.handyData.payback = true;
				console.log(`Client chose not to continue, returning the amount of ${payload.payment} to client named ${payload.handyData.client.name}`);
				let socketId = users[payload.reciverId];
				IO.to(socketId).emit('returendYouMoney', payload);
				socketId = null;


			}
		}

		socket.on('paidTotal', startWorking);
		function startWorking(payload) {
			console.log('amount paid', payload.handyData.costEstimate);

			let socketId = users[payload.reciverId];
			IO.to(socketId).emit('startWorking', payload);
			socketId = null;
		}

		// service declined 
		socket.on('serviceRejected', nextClient)
		function nextClient(payload) {
			console.log('rejected')
			let socketId = users[payload.reciverId];
			IO.to(socketId).emit('serviceRejected', payload);
			socketId = null;
		}


		socket.on('ontimeorless', finishedOnTime);
		function finishedOnTime(payload) {
			let hourlyPayment = payload.handyData.costEstimate.hourlyPayment
			let expectedWorkTime = payload.handyData.costEstimate.expectedWorkTime
			let hourlyRate = payload.handyData.costEstimate.hourlyRate

			const oneHoursFixer = expectedWorkTime - payload.handyData.deffrance / expectedWorkTime;
			payload.handyData.hourlyPayment = hourlyRate * oneHoursFixer;
			console.log('::::::::ontimeorless ', payload);
			console.log('third stage payment ', payload.handyData.hourlyPayment);

			let socketId = users[payload.senderId];
			IO.to(socketId).emit('lastPayment', payload);
			socketId = null;

			socketId = users[payload.reciverId];
			IO.to(socketId).emit('lastPayment', payload);
			socketId = null;
		}

		socket.on('moreCharge', finishedlate);
		function finishedlate(payload) {
			let hourlyPayment = payload.handyData.costEstimate.hourlyPayment
			let expectedWorkTime = payload.handyData.costEstimate.expectedWorkTime
			let hourlyRate = payload.handyData.costEstimate.hourlyRate

			const oneHoursFixer = (expectedWorkTime + payload.handyData.deffrance) / expectedWorkTime;
			payload.handyData.hourlyPayment = hourlyRate * oneHoursFixer;
			console.log('::::::::moreCharge ', payload);
			console.log('third stage payment ', payload.handyData.hourlyPayment);


			let socketId = users[payload.senderId];
			IO.to(socketId).emit('lastPayment', payload);
			socketId = null;

			socketId = users[payload.reciverId];
			IO.to(socketId).emit('lastPayment', payload);
			socketId = null;
		}


		socket.on('paidrdStage', confirmedpayment);
		function confirmedpayment(payload) {
			console.log('paid for this operation', payload.handyData.costEstimate);

			let socketId = users[payload.reciverId];
			IO.to(socketId).emit('paidrdStage', payload);
			socketId = null;

			let socketIds = users[payload.senderId];
			IO.to(socketIds).emit('paidrdStage', payload);
			socketId = null;
		}

		socket.on('reviewOfHandyman', sendingServer);
		function sendingServer(payload) {
			console.log(`the operator ${payload.handyData.handyman.name} got the rating of ${payload.handyData.handyman.review} for this operation`);
			// logic to send to the server here
		}

		socket.on('reviewOfclient', sendingCleintToServer);
		function sendingCleintToServer(payload) {
			console.log(`the client ${payload.handyData.client.name} got the rating of ${payload.handyData.client.review} for this interaction`);
			// logic to send to the server here
		}


		socket.on('signOut', (payload) => {
			delete users[payload.userId];
			console.log(users);
		});
	});

	return IO;
};
