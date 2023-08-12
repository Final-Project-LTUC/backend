"use strict";

require('dotenv').config();
// require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const taskRouter= require('./routes/task');
const seedRouter=require('./routes/seed');
const pageNotFound=require('./middlewares/404');
const serverError=require('./middlewares/404');
const {signupRoute,singinRoute}=require('./auth/authRoutes');
const bearer = require('./auth/authMiddlewares/barer');
const messagingRoute=require('./routes/messages')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const logger = require("./middlewares/logger");
const handymenRouter = require('./routes/handymenRoutes'); 
const paymentHandler = require('./utils/paymentApi')
const companySignUp = require("./auth/authRoutes/signup"); 
const dashboard = require('./auth/authRoutes/dashboard')
const expertiesRouter = require('./routes/expertiesroute');
const reviewRouter=require('./routes/review');
app.use(companySignUp);




const server = require('http').createServer(app)
const createSocketConnection = require('./sockets/backend/hub');
const ioServer = createSocketConnection(server);



app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// to find suitable handy man and companies 
app.use('/', handymenRouter);
app.use('/', expertiesRouter);



// test payment to pay the sockets and send data to the data base
app.use('/payment', paymentHandler);
// localhos:3000/payment/1 or 2 or 3 depending on the stag --------sockets



// dashboard
app.use('/dashboard',dashboard.getPersonalData)
app.use('/dashupdate',dashboard.updatePersonalData)

app.use('/', taskRouter);

// router for reviews 
app.use('/',reviewRouter);

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));
app.use(signupRoute);
app.use(singinRoute);
app.use(messagingRoute);
app.use("*", pageNotFound);
app.use(serverError);

function start(port) {
    server.listen(port, () => console.log(`up and running on port: ${port}`));
}
module.exports = {
    app,
    start,
    server,
};
