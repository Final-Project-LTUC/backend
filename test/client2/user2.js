const io = require("socket.io-client");
const host = "http://localhost:3000/";
const socket = io.connect(host);

 //  try to connect two users on one handyman!!!!!!

setTimeout(() => { 
    let userId = "laith123";
    socket.emit("signIn", { userId });
}, 3000);

// setTimeout(() => {
//     let userId = "ali567";
//     socket.emit("signOut", { userId });
// }, 7000);

socket.on("message", (payload) => {
    console.log(payload.message);
});


setTimeout(() => {
    let reciverId = "ali";
    socket.emit("privateMessage", {
        message: "client laith: good morning ahmed",
        reciverId,
        senderId: "laith123",
    });
}, 7000);


