const IO = require("socket.io")(3000);


const users = {


}



IO.on("connection", (socket) => {
    console.log(`new user ${socket.id}`);

    socket.on('signIn', (payload) => {
        users[payload.userId] = socket.id;
        console.log(users);
    })

    socket.on('pickHandyman', (payload) => {
        console.log(`client ${payload.handyData.client.name} requast is successfull with payload:`, payload.handyData.handyman)

        let socketId = users[payload.reciverId];
        IO.to(socketId).emit("client-recived", payload)
        socketId = null;
    })

    socket.on('busyHandyMan', busy)
    function busy(payload) {

        console.log('handyman is busy')

        let socketId = users[payload.reciverId];
        IO.to(socketId).emit("handymanIsBusy", payload)
        socketId = null;
    }

    socket.on('schedualeAndpayment', handlePaymentAndScheduale) // handman
    function handlePaymentAndScheduale(payload) {
        // distance calculations here
        payload.status = true;  // here it should be true if the payment logic worked false if payment logic failed and the transaction failed
        let socketId = users[payload.reciverId];
        IO.to(socketId).emit("transaction", payload)
        socketId = null;

        let socketIds = users[payload.senderId];
        IO.to(socketIds).emit("transaction", payload)
    }

    socket.on('arrived', arrivedOrLate)
    function arrivedOrLate(payload) {
        if (payload.handyData.onTime === true) {
            console.log('arrived on time ready for work', payload)
            let socketId = users[payload.reciverId];
            IO.to(socketId).emit("arrived", payload)
            socketId = null;

            // } else {
            //     console.log('arrived late and wating for client response ') // add logic for canceling if the user wants and to get money back to the user
            //     // ioServer.emit('arrived',payload)
            //     console.log('arrived on time ready for work', payload)
            //     let socketId = users[payload.reciverId];
            //     IO.to(socketId).emit("late", payload)
            //     socketId = null;

        }

    }

    // from the handyman 
    socket.on('costestimate', estimate) // log the price and emit to the client and handy man if accepted
    function estimate(payload) {
        console.log('product costs ', payload.handyData.costEstimate.price)

        let socketId = users[payload.reciverId];
        IO.to(socketId).emit("costestimate", payload) // from hub to all
        socketId = null;

    }

    socket.on("signOut", (payload) => {
        delete users[payload.userId]
        console.log(users);
    });
});
