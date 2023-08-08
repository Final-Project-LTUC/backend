const io = require("socket.io-client");
const host = "http://localhost:3000/";
const socket = io.connect(host);

setTimeout(() => {
    let userId = "ahmed99";
    socket.emit("signIn", { userId });
}, 5000);

// setTimeout(() => {
//     let userId = "ahmed99";
//     socket.emit("signOut", { userId });
// }, 8000);

socket.on("message", (payload) => {
    console.log(payload.message);
    const message = {
        reciverId: payload.senderId,
        senderId: payload.userId,
        message: "handyMan ahmed: good morning Rama",
    };
    setTimeout(() => {
        socket.emit("privateMessage", message);
    }, 1000);
});
