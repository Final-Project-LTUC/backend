'use strict';

require('dotenv').config();
const port = process.env.PORT || 3001;
const handyData = {
    client: {
      name: 'rama',
      rate: 5, 
      interval: 5000,
      dateOfReq: new Date()
    },
    handyman: {
      name: 'laith',
      rating: 5,
      price: 20
     
    },
  
    
  };
 

const { emit } = require('nodemon');
const ioClient = require('socket.io-client');
const host = `http://localhost:${port}`;
const socket = ioClient.connect(host);
// emiting chosen handyman data by the client
socket.emit('pickHandyman',handyData);
socket.on('handymanIsBusy',apology)
function apology (payload) {
    console.log('sorry the professonal you asked for is busy you can use the services of ',payload)
}
// if it is paied it should tell the client the money has been taken from his wallet
socket.on('transaction',paidOrNot)// from the hub 
function paidOrNot(payload){
  if (payload.status === true){
    console.log('paid and costed ' , payload.payment, 'and on the schedule ', payload.schedule)

  }


}
socket.on('arrived',arrived)
function arrived(){
  console.log('arrived at your doorstep')
}
socket.on('late',late)
function late (payload){
  console.log('arrived late',payload)
  
  // front end asking if you want to continue or reject the service 
  // if yes he will get a discount on the service
  // you can change the policy from here for payments
  socket.on('costestimate',acceptingCost) 
function acceptingCost (payload) {
    
  payload.client.choice = true
  if (payload.client.choice) {
  
  socket.emit('choiceToContinue',payload) // made so whatever the choice it will be sent to the hub
console.log('It will cost you ', payload.costEstimate.price)
if (payload.costEstimate.price) {
  socket.emit('paidTotal',payload)
} else {
  console.log('service rejected')
  socket.emit('serviceRejected')
}
}
    
    

    
  }
}
// socket.on('costestimate',acceptingCost) 
// function acceptingCost (payload) {
// console.log('It will cost you ', payload.costEstimate.price)
// if (payload.costEstimate.price) {
//   socket.emit('paidTotal',payload)
// } else {
//   console.log('service rejected')
//   socket.emit('serviceRejected')
// }
// }
socket.on('lastPayment',stageThree)
function stageThree(payload) {
  console.log('last payment for handyman hourly rate', payload.costEstimate.hourlyPayment)
  payload.seccesfullpayment = true
  console.log('testing:::::::',payload)
  socket.emit('paidrdStage',payload)
   payload.handyman.review = Math.floor(Math.random() * 5) + 1; // front end based
  socket.emit('reviewOfHandyman',payload)//// reviewing the handyman
}
