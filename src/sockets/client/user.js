'use strict';

require('dotenv').config();
const ioClient = require('socket.io-client');
const host = process.env.SERVER_HOST || 'http://localhost:3000';
const socket = ioClient.connect(host);
const axios = require('axios')
// const senderId = 'rama'; // Example sender ID
// const receiverId = 'laith'; // Example receiver ID


// const handyData = {
//   client: {
//     name: 'rama',
//     rate: 5,
//     interval: 5000,
//     dateOfReq: new Date()
//   },
//   handyman: {
//     name: 'laith',
//     rating: 5,
//     price: 20
//   }
// };


const apiUrl = 'http://localhost:3000/1/clienttasks'; // Replace with your API route
axios.get(apiUrl)
  .then(response => {
    // Handle the response data here
    console.log('Response:', response.data);
    setTimeout(() => {
      let userId = response.data[0].clientId;
      socket.emit("signIn", { userId });
    }, 0);
    let handyData = response.data[0]
    let senderId = response.data[0].clientId
    let reciverId = response.data[0].handymanId
    // Emit 'pickHandyman' event with sender and receiver IDs
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
        console.log('Paid and costed:', payload.payment, 'and scheduled at:', payload.schedule);
      }
    }
    
    
    socket.on('arrived', arrived);
    function arrived() {
      console.log('Arrived at your doorstep');
      socket.on('costestimate', acceptingCost);
    }
    
    function acceptingCost(payload) {
      console.log('Estimated cost:', payload.handyData.costEstimate.price);
    
      const temp = payload.reciverId;
      payload.reciverId = payload.senderId;
      payload.senderId = temp;
      // socket.emit('choiceToContinue', payload);
      if (payload.handyData.costEstimate.price) {
        socket.emit('paidTotal', payload);
      }
    }
    
    socket.on('late', late);
    
    function late(payload) {
      console.log('Arrived late:', payload);
      payload.handyData.client.choice = false;
    
      // Frontend asks if the user wants to continue or reject the service
      // Depending on the user's choice, handle further actions
      if (payload.handyData.client.choice) {
        console.log('User choice:', payload.handyData.client.choice);
        socket.on('costestimate', acceptingCost);
      } else {
        console.log('User choice:', payload.handyData.client.choice);
        socket.emit('serviceRejected', {
          senderId,
          reciverId: receiverId
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
      console.log('Testing:', payload);
      socket.emit('paidrdStage', payload);
      payload.handyData.handyman.review = Math.floor(Math.random() * 5) + 1; // Front end based
      socket.emit('reviewOfHandyman', payload); // Reviewing the handyman
    }
    
    socket.on('returendYouMoney', refund);
    
    function refund(payload) {
      // console.log('ggggggggggggg', payload.handyData)
      console.log('You have been paid:', payload.payment, 'to the name', payload.handyData.client.name);
    }




  })
  .catch(error => {
    // Handle errors here
    console.error('Error:', error);
  });





// setTimeout(() => {
//   let userId = "rama";
//   socket.emit("signIn", { userId });
// }, 0);

// // Emit 'pickHandyman' event with sender and receiver IDs
// socket.emit('pickHandyman', {
//   handyData,
//   senderId,
//   reciverId: receiverId,
// });

// socket.on('handymanIsBusy', apology);
// function apology(payload) {
//   console.log('Sorry, the professional you asked for is busy. You can use the services of:', payload.recomednedHandyman);
// }


// socket.on('transaction', paidOrNot);
// function paidOrNot(payload) {
//   if (payload.status === true) {
//     console.log('Paid and costed:', payload.payment, 'and scheduled at:', payload.schedule);
//   }
// }


// socket.on('arrived', arrived);
// function arrived() {
//   console.log('Arrived at your doorstep');
//   socket.on('costestimate', acceptingCost);
// }

// function acceptingCost(payload) {
//   console.log('Estimated cost:', payload.handyData.costEstimate.price);

//   const temp = payload.reciverId;
//   payload.reciverId = payload.senderId;
//   payload.senderId = temp;
//   // socket.emit('choiceToContinue', payload);
//   if (payload.handyData.costEstimate.price) {
//     socket.emit('paidTotal', payload);
//   }
// }

// socket.on('late', late);

// function late(payload) {
//   console.log('Arrived late:', payload);
//   payload.handyData.client.choice = false;

//   // Frontend asks if the user wants to continue or reject the service
//   // Depending on the user's choice, handle further actions
//   if (payload.handyData.client.choice) {
//     console.log('User choice:', payload.handyData.client.choice);
//     socket.on('costestimate', acceptingCost);
//   } else {
//     console.log('User choice:', payload.handyData.client.choice);
//     socket.emit('serviceRejected', {
//       senderId,
//       reciverId: receiverId
//     });
//     socket.emit('choiceToContinue', payload);
//   }
// }



// socket.on('lastPayment', stageThree);

// function stageThree(payload) {
//   const temp = payload.reciverId;
//   payload.reciverId = payload.senderId;
//   payload.senderId = temp;
//   console.log('Last payment for handyman hourly rate:', payload.handyData.hourlyPayment);
//   payload.handyData.seccesfullpayment = true;
//   console.log('Testing:', payload);
//   socket.emit('paidrdStage', payload);
//   payload.handyData.handyman.review = Math.floor(Math.random() * 5) + 1; // Front end based
//   socket.emit('reviewOfHandyman', payload); // Reviewing the handyman
// }

// socket.on('returendYouMoney', refund);

// function refund(payload) {
//   // console.log('ggggggggggggg', payload.handyData)
//   console.log('You have been paid:', payload.payment, 'to the name', payload.handyData.client.name);
// }