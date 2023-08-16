// const socketIO = require('socket.io');
// const { taskModel, handymenModel, companyModel, userModel } = require('../../models');










// module.exports = (server) => {
// 	const IO = socketIO(server);

// 	const users = {};

// 	IO.on('connection', (socket) => {
// 		console.log(`new user ${socket.id}`);

// 		socket.on('signIn', (payload) => {
// 			users[payload.userId] = socket.id;
// 			console.log(users);
// 		});

// 		socket.on('pickHandyman', async (payload) => {

// 			try {
// 				const handyman = await handymenModel.findAll({
// 					where: { id: payload.handyData.handymanId },
// 				});

// 			} catch (err) {
// 				console.error(err);

// 			}
// 			try {
// 				const user = await userModel.findAll({
// 					where: { id: payload.handyData.clientId },
// 				});

// 			} catch (err) {
// 				console.error(err);

// 			}


// 			let socketId = users[payload.reciverId];
// 			IO.to(socketId).emit('client-recived', payload);
// 			socketId = null;
// 		});
// 		socket.on('schedualeAndpayment', handlePaymentAndScheduale) // handman
// 		async function handlePaymentAndScheduale(payload) {
// 			try {
// 				const task = await taskModel.findByPk(payload.handyData.id);

// 				if (!task) {
// 					return res.status(404).json({ error: 'Task not found' });
// 				}
// 				if (Number.isInteger(payload.handyData.schdualedAt)) {
// 					task.schdualedAt = payload.handyData.schdualedAt;
// 				}
				



// 				// Save the updated task
// 				await task.save();


// 			} catch (error) {
// 				console.log('error', error)
// 			}

// 			// distance calculations here
// 			payload.status = true;  // here it should be true if the payment logic worked false if payment logic failed and the transaction failed
// 			let socketId = users[payload.reciverId];
// 			IO.to(socketId).emit("transaction", payload)
// 			socketId = null;

// 			let socketIds = users[payload.senderId];
// 			IO.to(socketIds).emit("transaction", payload)
// 		}
// 		socket.on('arrived', arrivedOrLate)
// 		async function arrivedOrLate(payload) {

// 			try {
// 				const task = await taskModel.findByPk(payload.handyData.id);

// 				if (!task) {
// 					return res.status(404).json({ error: 'Task not found' });
// 				}
// 				if (typeof payload.handyData.onTime === 'boolean') {
// 					task.onTime = payload.handyData.onTime;
// 				}



// 				// Save the updated task
// 				await task.save();


// 			} catch (error) {
// 				console.log('error', error)
// 			}

// 			if (payload.handyData.onTime === true) {
// 				console.log('arrived on time ready for work', payload)
// 				let socketId = users[payload.reciverId];
// 				IO.to(socketId).emit("arrived", payload)
// 				socketId = null;
// 			}
// 			else {
// 				console.log('arrived late and wating for client response ') // add logic for canceling if the user wants and to get money back to the user
// 				// ioServer.emit('arrived',payload)
// 				// console.log('arrived on time ready for work', payload)
// 				let socketId = users[payload.reciverId];
// 				IO.to(socketId).emit("late", payload)
// 				socketId = null;

// 			}

// 		}

// 		// from the handyman 
// 		socket.on('details', estimate) // log the price and emmit to the client and handy man if accepted
// 		async function estimate(payload) {
// 			try {
// 				const task = await taskModel.findByPk(payload.handyData.id);

// 				if (!task) {
// 					return res.status(404).json({ error: 'Task not found' });
// 				}
// 				if (payload.handyData.details && typeof payload.handyData.details === 'object') {
// 					task.details = payload.handyData.details;
// 				}



// 				// Save the updated task
// 				await task.save();


// 			} catch (error) {
// 				console.log('error', error)
// 			}


// 			console.log('product costs ', payload.handyData.details.price)
// 			let socketId = users[payload.reciverId];
// 			IO.to(socketId).emit("details", payload)
// 			socketId = null;
// 		}


// 		socket.on('busyHandyMan', busy);
// 		function busy(payload) {
// 			console.log('handyman is busy');

// 			let socketId = users[payload.reciverId];
// 			IO.to(socketId).emit('handymanIsBusy', payload);
// 			socketId = null;
// 		}

// 		socket.on('returnStageOne', returningPayment);
// 		function returningPayment(payload) {
// 			console.log(`returning amount: ${payload.handyData.payment} to client ${payload.handyData.clientName}`);
// 		}

// 		socket.on('choiceToContinue', choiceToContinueLate);
// 		async function choiceToContinueLate(payload) {

// 			if (payload.handyData.choice) {

// 				try {
// 					const task = await taskModel.findByPk(payload.handyData.id);

// 					if (!task) {
// 						return res.status(404).json({ error: 'Task not found' });
// 					}
// 					if (typeof payload.handyData.choice === 'boolean') {
// 						task.choice = payload.handyData.choice;
// 					}



// 					// Save the updated task
// 					await task.save();


// 				} catch (error) {
// 					console.log('error', error)
// 				}
// 			}



// 			// IO.emit('choiceToContinue', payload);

// 			if (!payload.handyData.choice) {
// 				payload.handyData.payback = true;
// 				console.log(`Client chose not to continue, returning the amount of ${payload.payment} to client named ${payload.handyData.clientName}`);
// 				let socketId = users[payload.reciverId];
// 				IO.to(socketId).emit('returendYouMoney', payload);
// 				socketId = null;


// 			}
// 		}

// 		socket.on('paidTotal', startWorking);
// 		function startWorking(payload) {
// 			console.log('amount paid', payload.handyData.details);

// 			let socketId = users[payload.reciverId];
// 			IO.to(socketId).emit('startWorking', payload);
// 			socketId = null;
// 		}

// 		// service declined 
// 		socket.on('serviceRejected', nextClient)
// 		async function nextClient(payload) {
// 			try {
// 				const task = await taskModel.findByPk(payload.payload.handyData.id);

// 				if (!task) {
// 					return res.status(404).json({ error: 'Task not found' });
// 				}
// 				if (typeof payload.payload.handyData.choice === 'boolean') {
// 					task.choice = payload.payload.handyData.choice;
// 				}



// 				// Save the updated task
// 				await task.save();


// 			} catch (error) {
// 				console.log('error', error)
// 			}

// 			console.log('rejected')
// 			let socketId = users[payload.reciverId];
// 			IO.to(socketId).emit('serviceRejected', payload);
// 			socketId = null;
// 		}


// 		socket.on('ontimeorless', finishedOnTime);
// 		function finishedOnTime(payload) {
// 			let hourlyPayment = payload.handyData.details.hourlyPayment
// 			let expectedWorkTime = payload.handyData.details.expectedWorkTime
// 			let hourlyRate = payload.handyData.details.hourlyRate

// 			const oneHoursFixer = expectedWorkTime - payload.handyData.deffrance / expectedWorkTime;
// 			payload.handyData.hourlyPayment = hourlyRate * oneHoursFixer;
// 			console.log('third stage payment ', payload.handyData.hourlyPayment);

// 			let socketId = users[payload.senderId];
// 			IO.to(socketId).emit('lastPayment', payload);
// 			socketId = null;

// 			socketId = users[payload.reciverId];
// 			IO.to(socketId).emit('lastPayment', payload);
// 			socketId = null;
// 		}

// 		socket.on('moreCharge', finishedlate);
// 		function finishedlate(payload) {
// 			let hourlyPayment = payload.handyData.details.hourlyPayment
// 			let expectedWorkTime = payload.handyData.details.expectedWorkTime
// 			let hourlyRate = payload.handyData.details.hourlyRate

// 			const oneHoursFixer = (expectedWorkTime + payload.handyData.deffrance) / expectedWorkTime;
// 			payload.handyData.hourlyPayment = hourlyRate * oneHoursFixer;
// 			console.log('third stage payment ', payload.handyData.hourlyPayment);


// 			let socketId = users[payload.senderId];
// 			IO.to(socketId).emit('lastPayment', payload);
// 			socketId = null;

// 			socketId = users[payload.reciverId];
// 			IO.to(socketId).emit('lastPayment', payload);
// 			socketId = null;
// 		}


// 		socket.on('paidrdStage', confirmedpayment);
// 		function confirmedpayment(payload) {
// 			console.log('paid for this operation', payload.handyData.details);

// 			let socketId = users[payload.reciverId];
// 			IO.to(socketId).emit('paidrdStage', payload);
// 			socketId = null;

// 			let socketIds = users[payload.senderId];
// 			IO.to(socketIds).emit('paidrdStage', payload);

// 			socketId = null;
// 		}

// 		socket.on('reviewOfHandyman', sendingServer);
// 		async function sendingServer(payload) {
// 			try {
// 				const task = await taskModel.findByPk(payload.handyData.id);

// 				if (!task) {
// 					return res.status(404).json({ error: 'Task not found' });
// 				}
// 				if (Number.isInteger(payload.handyData.review)) {
// 					task.reviewOfHandyman = payload.handyData.review;
// 				}



// 				// Save the updated task
// 				await task.save();


// 			} catch (error) {
// 				console.log('error', error)
// 			}

// 			console.log(`the operator  got the rating of ${payload.handyData.review} for this operation`);

// 			// logic to send to the server here
// 		}

// 		socket.on('reviewOfclient', sendingCleintToServer);
// 		async function sendingCleintToServer(payload) {
// 			try {
// 				const task = await taskModel.findByPk(payload.handyData.id);

// 				if (!task) {
// 					return res.status(404).json({ error: 'Task not found' });
// 				}
// 				if (Number.isInteger(payload.handyData.review)) {
// 					task.reviewOfClient = payload.handyData.review;
// 				}



// 				// Save the updated task
// 				await task.save();


// 			} catch (error) {
// 				console.log('error', error)
// 			}

// 			console.log(`the client  got the rating of ${payload.handyData.review} for this interaction`);

// 			// logic to send to the server here
// 		}


// 		socket.on('signOut', (payload) => {
// 			delete users[payload.userId];
// 			console.log(users);
// 		});
// 	});

// 	return IO;
// };
