const io = require("socket.io-client");
const host = "http://localhost:3000/";
const socket = io.connect(host);


const handyData = {
    client: {
        name: 'rama',
        rate: 5,
        interval: 5000,
        dateOfReq: new Date()
    },
    handyman: {
        name: 'laith',
        rating: 5,
        price: 20

    },
};


setTimeout(() => {
    let userId = "rama567";
    socket.emit("signIn", { userId });
}, 3000);


setTimeout(() => {
    let reciverId = "laith123";
    socket.emit('pickHandyman', {
        handyData,
        reciverId,
        senderId: "rama567",
    });
}, 4000);


socket.on('handymanIsBusy', apology)
function apology(payload) {
    console.log('sorry the professonal you asked for is busy you can use the services of ', payload.recomednedHandyman)
}


socket.on('transaction', paidOrNot)// from the hub 
function paidOrNot(payload) {
    if (payload.status === true) {
        console.log('paid and costed ', payload.payment, 'and on the schedule ', payload.schedule)
    }

    socket.on('arrived', arrived)
    function arrived() {
        console.log('arrived at your doorstep')
        socket.on('costestimate', acceptingCost)
        function acceptingCost(payload) {
            socket.emit('choiceToContinue', payload) // made so whatever the choice it will be sent to the hub //وصلتي هوون
            console.log('It will cost you ', payload.costEstimate.price)
            if (payload.costEstimate.price) {
                socket.emit('paidTotal', payload)
            }
        }
    }

}