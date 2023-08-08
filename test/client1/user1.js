const io = require("socket.io-client");
const host = "http://localhost:3000/";
const socket = io.connect(host);

setTimeout(() => {
    let userId = "rama567";
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
    let reciverId = "ahmed99";
    socket.emit("privateMessage", {
        message: "client rama: good morning ahmed",
        reciverId,
        senderId: "rama567",
    });
}, 7000);


