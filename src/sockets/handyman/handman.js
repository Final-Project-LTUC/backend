'use strict';

require('dotenv').config();
const port = process.env.PORT || 3001;

const { emit } = require('nodemon');
const ioClient = require('socket.io-client');
const host = `http://localhost:${port}`;
const socket = ioClient.connect(host);




// socket.join("testing room");

socket.on('client-recived',recivedAClient)// step 1
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
        console.log('all clients ------------ ',arrayOfClients)

        console.log('chosen Array ------------ ',chosenClients)

       } else if(payload.client.name === 'rama' && chosenClients.length <= 3) { 
        chosenClients.push(payload.client)
        console.log('chosen Array ------------ ',chosenClients)
        payload.payment=20  // payload here should be for each client and should be dynamic
        payload.schedule='14:00 pm'
       socket.emit('schedualeAndpayment',payload) //step 2
     
     
    
  
    }
       else{
           
           
           socket.emit('busyHandyMan',recomedned)
   
        
       } 
       

    
        // console.log(arrayOfClients)
        // console.log('chosen clients',chosenClients)
    },2000 )// here we could use this to test casses if the requast is late or not 
}

 socket.on('transaction',notifiedOfPayment) // notified that the cliennt has paied and your money is in the companies wallet.
 function notifiedOfPayment(payload){
    setTimeout(()=> {
      console.log('transaction succesful for client',payload.client)  
      
    },4000)

    //////////////
    socket.on('choiceToContinue',workOrNot)
    function workOrNot(payload) {
        setTimeout(()=>{
           if(payload.client.choice==false){
            console.log(payload.client.name,'the client chose not to continue returning the amount of ', payload.payment)
            socket.emit('returnStageOne',payload)
          
        }    
        },5000)
     

    }
    payload.onTime=false // false  is late more 30 min 

    socket.emit('arrived',payload) // hadnyman arrived at the location by pressing something at schedeuled time c
    
    /// product cost estimation
 setTimeout(()=>{
        
        payload.costEstimate = {price:100, expectedWorkTime:5000, hourlyRate:15}

        socket.emit('costestimate',payload)
        console.log('test :::::::::::::')

 },5000)

 
 socket.on('startWorking',startWorking)
 function startWorking(payload){
    setTimeout(()=>{
    console.log('Amount paid you can start working')
   const starDate = Date.now()
   setTimeout(()=>{
    const finishDate = Date.now()
    let timeWorked = finishDate - starDate ;
    
    let deffrance = timeWorked - payload.costEstimate.expectedWorkTime;
 
    payload.deffrance = deffrance;
   
    if (deffrance<=0 ) {
        socket.emit('ontimeorless',payload)
    } else if(deffrance>0){
        
        socket.emit('moreCharge',payload)
    }



   },6000)// to control if late or not     

   socket.on('paidrdStage',recipt)
   function recipt(payload){
    
    console.log('reciept ::::::::',payload.costEstimate)
    payload.client.review = Math.floor(Math.random() * 5) + 1; // front end based it is a random number
    

    socket.emit('reviewOfclient',payload)//// reviewing the client
    console.log("client::::",payload.client)
   

   }
   


 },7000)
    

   
   
   

 }

 socket.on('serviceRejected',nextClient)
 function nextClient(){
    setTimeout(()=>{
       
      console.log('service not accepted go smoke shisha')  
    },5000)
    // button in front end indecation that the client rejected
    
  
 }
 }

