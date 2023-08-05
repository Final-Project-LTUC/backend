'use strict';

require('dotenv').config();
const port = process.env.PORT || 3001;

const { emit } = require('nodemon');
const ioClient = require('socket.io-client');
const host = `http://localhost:${port}`;
const socket = ioClient.connect(host);
socket.on('client-recived',recivedAClient)
let arrayOfClients = [];
let chosenClients = [];

function recivedAClient(payload) {
    setTimeout(()=> {
      
       console.log('got a client ',payload) 
       const dateOfReq = new Date(Date.parse(payload.client.dateOfReq));// logic to create expiray date for user requast

       payload.expireDate = new Date(dateOfReq.getTime() + payload.client.interval);
       

       const currentDate = Date.now(); // Use Date.now() instead of Date().now
       console.log('expirey date::::::::: ', payload.expireDate.getTime())
       console.log('current date::::::::::',currentDate)

       

       
       arrayOfClients.push(payload.client)
       
       let recomedned = {  // front end input 
        name: 'abdeen',
        rating: 5 ,
        price: 20 


    }
       // logic for expiration.
       if ( currentDate >= payload.expireDate){

       
        socket.emit('busyHandyMan',recomedned)
       } else if(payload.client.name === 'rama' && chosenClients.length <= 3) { 
        chosenClients.push(payload.client)
       socket.emit('schedualeAndpayment',{user: payload.client,payment:20,schedule:'14:00 pm'}) // payload here should be for each client and should be dynamic
     
     
    
  
    }
       else{
           
           
           socket.emit('busyHandyMan',recomedned)
   
        
       } 
       

    
        console.log(arrayOfClients)
        console.log('chosen clients',chosenClients)
    },2000 )// here we could use this to test casses if the requast is late or not 
}

 socket.on('transaction',notifiedOfPayment) // notified that the cliennt has paied and your money is in the companies wallet.
 function notifiedOfPayment(payload){
    setTimeout(()=> {
      console.log('transaction succesful for client',payload.user)  
    },4000)

    //////////////
    socket.emit('arrived',{late: 'late',onTime:true}) // hadnyman arrived at the location by pressing something at schedeuled time c
    
    /// product cost estimation
 setTimeout(()=>{
        socket.emit('costestimate',{price:100, expectedWorkTime:5000})
        console.log('test :::::::::::::')

 },5000)

 
 socket.on('startWorking',startWorking)
 function startWorking(payload){
    setTimeout(()=>{
    console.log('Amount paid you can start working')
   const starDate = Date().now 
   setTimeout(()=>{
    const finishDate = Date().now
    let timeWorked = starDate - finishDate;
    let deffrance = timeWorked - payload.expectedWorkTime;
    payload.deffrance = deffrance;
    if (deffrance===0) {
        socket.emit('sameCharge',payload)
    } else if(deffrance>0){
        socket.emit('extraCharge',payload)

    }else if(deffrance<0){
        socket.emit('lessCharge',payload)
    }


   },3000)    

 },7000)
    

   
   
   

 }
 socket.on('serviceRejected',nextClient)
 function nextClient(){
    console.log('service not accepted go smoke shisha')
  
 }
 }
