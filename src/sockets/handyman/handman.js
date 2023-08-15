const io = require("socket.io-client");
const host = "http://localhost:3000";
const socket = io.connect(host);

const axios = require('axios')



const apiUrl = 'http://localhost:3000/clienttasks/2'; // Replace with your API route
axios.get(apiUrl)
  .then(response => {
    // Handle the response data here
    
    setTimeout(() => {
      let userId = response.data[0].handymanId;
      socket.emit("signIn", { userId });
    }, 0);





socket.on("client-recived", recivedAClient)
let arrayOfClients = [];
let chosenClients = [];


function recivedAClient(payload) {
    console.log('got a client ')
    setTimeout(() => {

        const dateOfReq = new Date(payload.handyData.dateOfReq) ;// logic to create expiray date for user requast
        
      
        payload.handyData.expireDate = dateOfReq.getTime()+ payload.handyData.interval;


        const currentDate = Date.now(); // Use Date.now() instead of Date().now
        console.log('expirey date::::::::: ', payload.handyData.expireDate)
        console.log('current date::::::::::', currentDate)




        arrayOfClients.push(payload.handyData.client)
        let recomedned = {  // front end input 
            recomednedHandyman: {
                name: 'abdeen',
                rating: 5,
                price: 20,
            },
            reciverId: payload.senderId,
            senderId: payload.reciverId,
        }


        if (currentDate >= payload.handyData.expireDate) {

            socket.emit('busyHandyMan', recomedned)

        } else if (payload.handyData.clientName && chosenClients.length <= 3) {

            chosenClients.push(payload.handyData.client)

            payload.handyData.payment = 20  // payload here should be for each client and should be dynamic
            payload.handyData.schdualedAt = dateOfReq.getTime()+ 2000;
            const temp = payload.reciverId;
            payload.reciverId = payload.senderId;
            payload.senderId = temp;


            socket.emit('schedualeAndpayment', payload) //step 2
        }

        else {
            socket.emit('busyHandyMan', recomedned)
        }

    }, 3000)
}

socket.on('transaction', notifiedOfPayment) // notified that the cliennt has paied and your money is in the companies wallet.
function notifiedOfPayment(payload) {
    setTimeout(() => {
        console.log('transaction succesful for client', payload.handyData.clientName)

    }, 2000)

    payload.handyData.onTime = false // false  is late more 30 min 
    socket.emit('arrived', payload) // hadnyman arrived at the location by pressing something at schedeuled time c


    setTimeout(() => {
        payload.handyData.details = { price: 100, expectedWorkTime: 5000, hourlyRate: 15 }
        socket.emit('details', payload)
    }, 5000)


    socket.on('startWorking', startWorking)
    function startWorking(payload) {
        setTimeout(() => {
            console.log('Amount paid you can start working')
            const starDate = Date.now()
            setTimeout(() => {
                const finishDate = Date.now()

                let timeWorked = finishDate - starDate;
                let deffrance = timeWorked - payload.handyData.details.expectedWorkTime;
                payload.handyData.deffrance = deffrance;

                if (deffrance <= 0) {
                    socket.emit('ontimeorless', payload)

                } else if (deffrance > 0) {
                    socket.emit('moreCharge', payload)
                }
            }, 6000)// to control if late or not     5

            socket.on('paidrdStage', recipt)
            function recipt(payload) {

                console.log('reciept ::::::::', payload.handyData.details)
                payload.handyData.review = Math.floor(Math.random() * 5) + 1; // front end based it is a random number
                socket.emit('reviewOfclient', payload)//// reviewing the client
                console.log("client::::", payload.handyData.clientName)
            }
        }, 7000)
    }

    socket.on('serviceRejected', nextClient)
    function nextClient() {
        setTimeout(() => {
            console.log('service not accepted')
        }, 5000)
        // button in front end indecation that the client rejected


    }

}


});


