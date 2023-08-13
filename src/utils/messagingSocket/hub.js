const io=require('socket.io')(3000);
const messages=io.of('/messages');
messages.on('connection',socket=>{
   socket.on('send-message',(message,inboxId)=>{
    socket.to(inboxId).emit('receive-message',message);
   });
});