'use strict';

require('dotenv').config();
const port = process.env.PORT || 3001;

const ioClient = require('socket.io-client');
const host = `http://localhost:${port}`;
const socket = ioClient.connect(host);
socket.on('client-recived',recivedAClient)
let arrayOfClients = [];

function recivedAClient(payload) {
    setTimeout(()=> {
       console.log('got a client ',payload.client)

    if(arrayOfClients.length <= 3)
    { arrayOfClients.push(payload.client)}
    else{
        // front end input 
        let recomedned = {
            name: 'abdeen',
            rating: 5 ,
            price: 20 


        }
        socket.emit('busyHandyMan',recomedned)

    } 
        console.log(arrayOfClients)
    },6000) 




}