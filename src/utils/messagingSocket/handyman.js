const io=require('socket.io-client');
const host='http://localhost:3000/messages';
const socket=io.connect(host);
const inboxId=3213;
console.log('handyman')
socket.on('receive-message',message=>{
    console.log(message);
});
setTimeout(()=>{
    socket.emit('send-message','Hello How may i help you ?',inboxId);
},2000);
