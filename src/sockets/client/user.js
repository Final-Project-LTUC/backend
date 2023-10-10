'use strict';

require('dotenv').config();
const ioClient = require('socket.io-client');
const host = process.env.SERVER_HOST || 'http://localhost:5000';
const socket = ioClient.connect(host);
const axios = require('axios')
const apiUrl = 'http://localhost:5000/clienttasks/2'; // Replace with your API route
axios.get(apiUrl)
  .then(response => {
    // Handle the response data here
   
    setTimeout(() => {
      let userId = response.data[0].clientId;
      socket.emit("signIn", { userId });
    }, 0);
    let handyData = response.data[0]
    let senderId = response.data[0].clientId
    let reciverId = response.data[0].handymanId || response.data[0].companyId 
    // Emit 'pickHandyman' event with sender and receiver IDs
   handyData.dateOfReq = new Date() 
   console.log('Response:', handyData);








    socket.emit('pickHandyman', {
      handyData,
      senderId,
      reciverId,
    });
    
    socket.on('handymanIsBusy', apology);
    function apology(payload) {
      console.log('Sorry, the professional you asked for is busy. You can use the services of:', payload.recomednedHandyman);
    }
    
    
    socket.on('transaction', paidOrNot);
    function paidOrNot(payload) {
      if (payload.status === true) {
        
        console.log('Paid and costed:', payload.handyData.payment, 'and scheduled at:', payload.handyData.schdualedAt);
      }
    }
    
    
    socket.on('arrived', arrived);
    function arrived() {
      console.log('Arrived at your doorstep');
      socket.on('details', acceptingCost);
    }
    
    function acceptingCost(payload) {
      console.log('Estimated cost:', payload.handyData.details.price);
    
      const temp = payload.reciverId;
      payload.reciverId = payload.senderId;
      payload.senderId = temp;
      // socket.emit('choiceToContinue', payload);
      if (payload.handyData.details.price) {
        socket.emit('paidTotal', payload);
      }
    }
    
    socket.on('late', late);
    
    function late(payload) {
      console.log('Arrived late:');
      payload.handyData.choice = false;
     
    
      // Frontend asks if the user wants to continue or reject the service
      // Depending on the user's choice, handle further actions
      if (payload.handyData.choice) {
        console.log('User choice:', payload.handyData.choice);
        socket.on('details', acceptingCost);   
             socket.emit('choiceToContinue', payload);

      } else {
        console.log('User choice:', payload.handyData.choice);
        socket.emit('serviceRejected', {
          payload,
          senderId,
          reciverId
        });
        socket.emit('choiceToContinue', payload);
      }
    }
    
    
    
    socket.on('lastPayment', stageThree);
    
    function stageThree(payload) {
      const temp = payload.reciverId;
      payload.reciverId = payload.senderId;
      payload.senderId = temp;
      console.log('Last payment for handyman hourly rate:', payload.handyData.hourlyPayment);
      payload.handyData.seccesfullpayment = true;
      socket.emit('paidrdStage', payload);
      payload.handyData.review = Math.floor(Math.random() * 5) + 1; // Front end based
      socket.emit('reviewOfHandyman', payload); // Reviewing the handyman
    }
    
    socket.on('returendYouMoney', refund);
    
    function refund(payload) {
      console.log('You have been paid:', payload.handyData.payment, 'to the user', payload.handyData.clientName);
    }




  })
  .catch(error => {
    // Handle errors here
    console.error('Error:', error);
  });



