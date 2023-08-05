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
socket.on('costestimate',acceptingCost) 
function acceptingCost (payload) {
console.log('It will cost you ', payload.price)
if (payload.price) {
  socket.emit('paidTotal',payload)
} else {
  console.log('service rejected')
  socket.emit('serviceRejected')
}
}

