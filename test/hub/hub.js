const IO = require("socket.io")(3000);


const users={

    'rama567': 'kjdsajkf23456',
    'ahmed99':'ldmknkj242'
};

IO.on("connection", (socket) => {
    console.log(`new user ${socket.id}`);
    
    socket.on('signIn',(payload)=>{
        users[payload.userId] = socket.id;
        console.log(users);
    })

    socket.on('privateMessage',(payload)=>{
        let socketId = users[payload.reciverId];
        IO.to(socketId).emit("message",payload)
        socketId=null;
    })

    socket.on("signOut", (payload) => {
        delete users[payload.userId]
        console.log(users);
    });
});
