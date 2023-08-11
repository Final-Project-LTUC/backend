const io = require("socket.io-client");
const host = "http://localhost:3000";
const socket = io.connect(host);

setTimeout(() => {
    let userId = "rami";
    socket.emit("signIn", { userId });
}, 2000);





socket.on("client-recived", recivedAClient)
let arrayOfClients = [];
let chosenClients = [];


function recivedAClient(payload) {
    console.log('got a client ', payload)
    // setTimeout(() => {

    // console.log('got a client ',payload) /
    const dateOfReq = new Date(Date.parse(payload.handyData.client.dateOfReq));// logic to create expiray date for user requast

    payload.handyData.expireDate = new Date(dateOfReq.getTime() + payload.handyData.client.interval);


    const currentDate = Date.now(); // Use Date.now() instead of Date().now
    console.log('expirey date::::::::: ', payload.handyData.expireDate.getTime())
    console.log('current date::::::::::', currentDate)




    arrayOfClients.push(payload.handyData.client)
    console.log('All Array ------------ ', arrayOfClients)
    // console.log('مشاان الله ', payload)
    let recomedned = {  // front end input 
        recomednedHandyman: {
            name: 'abdeen',
            rating: 5,
            price: 20,
        },
        reciverId: payload.senderId,
        senderId: payload.reciverId,
    }
    console.log('recomedned:', recomedned)

    if (currentDate >= payload.handyData.expireDate) {

        socket.emit('busyHandyMan', recomedned)

    } else if (payload.handyData.client.name === 'rama' && chosenClients.length <= 3) {
        // console.log('dddddddddddddddd', payload)
        chosenClients.push(payload.handyData.client)
        console.log('chosen Array ------------ ', chosenClients)
        payload.payment = 20  // payload here should be for each client and should be dynamic
        payload.schedule = '14:00 pm'
        const temp = payload.reciverId;
        payload.reciverId = payload.senderId;
        payload.senderId = temp;

        // console.log('toooo check', payload)
        socket.emit('schedualeAndpayment', payload) //step 2




    }
    else {


        socket.emit('busyHandyMan', recomedned)


    }


    // }, 5000)

    socket.on('transaction', notifiedOfPayment) // notified that the cliennt has paied and your money is in the companies wallet.
    function notifiedOfPayment(payload) {
        setTimeout(() => {
            console.log('transaction succesful for client', payload.handyData.client)

        }, 2000)

        payload.handyData.onTime = true // false  is late more 30 min 
        // console.log('a new test', payload)
        socket.emit('arrived', payload) // hadnyman arrived at the location by pressing something at schedeuled time c
    }

    setTimeout(() => {
        payload.handyData.costEstimate = { price: 100, expectedWorkTime: 5000, hourlyRate: 15 }
        console.log('test :::::::::::::',payload)
        socket.emit('costestimate', payload)
        
    }, 5000)



};
