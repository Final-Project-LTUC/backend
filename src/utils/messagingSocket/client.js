const io=require('socket.io-client');
const host='http://localhost:3000/messages';
const socket=io.connect(host);
const inboxId=3213;
console.log('client')
socket.emit('connection');
socket.emit('join-room',{clientId:1,inboxId:inboxId});
socket.on('receive-message',message=>{
    // console.log(message);
});
setTimeout(()=>{
    socket.emit('send-message','Hello there handyman');
},1000);

