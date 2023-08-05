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
        // distance calculations here
        payload.status = true;  // here it should be true if the payment logic worked false if payment logic failed and the transaction failed
        ioServer.emit('transaction',payload) // every where
        
     }

     socket.on('arrived',arrivedOrLate)
     function arrivedOrLate(payload) {
      if (payload.onTime===true) {
         console.log('arrived on time ready for work')
         ioServer.emit('arrived',payload)
      } else {
         console.log('get ready to deduct money') // add logic for canceling if the user wants and to get money back to the user
         // ioServer.emit('arrived',payload)
         ioServer.emit('late',payload)

         // socket.on('choiceToContinue',choiceToContinue)
         // function choiceToContinue (payload){
         //    console.log('client choice to continue', payload)
         //    ioServer.emit('choiceToContinue',payload)
         // }
      }
     }

     socket.on('choiceToContinue',choiceToContinue)
     function choiceToContinue (payload){
        console.log('client choice to continue', payload)
        ioServer.emit('choiceToContinue',payload)
     }

     // from the handyman 
     socket.on('costestimate',estimate) // log the price and emmit to the client and handy man if accepted
     function estimate(payload) {
      console.log('product costs ',(payload.costEstimate.price - payload.costEstimate.moneyBack ))
      
      ioServer.emit('costestimate',payload) // from hub to all
     }
     // service acepted
     socket.on('paidTotal',startWorking)
     function startWorking(payload) {
      console.log('amount paid',payload.costEstimate)
       ioServer.emit('startWorking',payload)
     }
    
     // service declined 
     socket.on('serviceRejected',nextClient)
     function nextClient(){
      ioServer.emit('serviceRejected')
     }
     /// third stage charge 
   
     socket.on('sameCharge',finishedOnTime)
     function finishedOnTime(payload) {
      let oneHoursFixer = payload.costEstimate.expectedWorkTime/payload.costEstimate.expectedWorkTime //  to make any time we used for testing as an hour to calc hourly rate
      payload.costEstimate.hourlyPayment = payload.costEstimate.hourlyRate*oneHoursFixer;
      console.log('::::::::test ', payload.costEstimate.hourlyPayment)
      console.log('third stage payment ',payload.costEstimate.hourlyPayment)
      ioServer.emit('lastPayment',payload)

     }
     socket.on('lessCharge',finishedlate)
     function finishedlate(payload) {
      let oneHoursFixer = (payload.costEstimate.expectedWorkTime-payload.deffrance)/payload.costEstimate.expectedWorkTime //  to make any time we used for testing as an hour to calc hourly rate
      payload.costEstimate.hourlyPayment = payload.costEstimate.hourlyRate*oneHoursFixer;
      console.log('::::::::test ', payload.costEstimate.hourlyPayment)
      console.log('third stage payment ',payload.costEstimate.hourlyPayment)
      ioServer.emit('lastPayment',payload)

     }
     
     socket.on('paidrdStage',confirmedpayment)
     function confirmedpayment (payload){
        
        console.log ('paied for this operation',payload.costEstimate)
        ioServer.emit('paidrdStage',payload)
        socket.on('reviewOfHandyman',sendingServer)// sending the review to server
        
        function sendingServer(payload) {
         console.log("the operator",payload.handyman.name," got the rating of", payload.handyman.review, 'for this operation')
         
         // logic to send to the server here
        }
       
        

        } 
        socket.on('reviewOfclient',sendingCleintToServer)
        function sendingCleintToServer(payload) { 
         console.log('the client',payload.client.name,"got the rating of ",payload.client.review,' for this interaciton' )
         // logic to send to the server here 
        
      }
      

    ; })
    
