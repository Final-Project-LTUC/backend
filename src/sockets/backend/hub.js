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
     socket.on('schedualeAndpayment', handlePaymentAndScheduale) // handman
     function handlePaymentAndScheduale(payload)
     {
        
        payload.status = true;  // here it should be true if the payment logic worked false if payment logic failed and the transaction failed
        ioServer.emit('transaction',payload) // every where
        
     }

     socket.on('arrived',arrivedOrLate)
     function arrivedOrLate(payload) {
      if (payload.onTime===true) {
         console.log('arrived on time ready for work')
         ioServer.emit('arrived')
      } else {
         console.log('get ready to deduct money') // add logic for canceling if the user wants and to get money back to the user
         ioServer.emit('late')
      }

     }
     // from the handyman 
     socket.on('costestimate',estimate) // log the price and emmit to the client and handy man if accepted
     function estimate(payload) {
      console.log('extra costs ',payload.price)
      ioServer.emit('costestimate',payload) // from hub to all
     }
     // service acepted
     socket.on('paidTotal',startWorking)
     function startWorking(payload) {
      console.log('amound paided',payload)
       ioServer.emit('startWorking',payload)
     }
    
     // service declined 
     socket.on('serviceRejected',nextClient)
     function nextClient(){
      ioServer.emit('serviceRejected')
     }

    ; })
    
