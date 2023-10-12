"use strict";

require("dotenv").config();
//const errorHandler = require("./auth/authMiddlewares/errorMiddleware");

// require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const taskRouter = require("./routes/task");
const seedRouter = require("./routes/seed");
const messagesRoute=require('./routes/messages');
const pageNotFound = require("./middlewares/404");
const {
    signupRoute,
    singinRoute,
    forgotPasswordRoute,
    resetPasswordRoute,
} = require("./auth/authRoutes");
const listEndpoints = require("express-list-endpoints");

const bearer = require("./auth/authMiddlewares/barer");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const logger = require("./middlewares/logger");
app.use(cors({
    origin : '*'
}
    
  ));
const handymenRouter = require('./routes/handymenRoutes'); 
const paymentHandler = require('./utils/paymentApi')
// const companySignUp = require("./auth/authRoutes/signup"); 
const dashboard = require('./auth/authRoutes/dashboard')
const expertiesRouter = require('./routes/expertiesroute')
// const companyRoutes = require('./routes/CompanyRoutes'); 

// app.use(companySignUp);

const server = require("http").createServer(app);
const io = require('./sockets/backend/hub')(server
);
// const createSocketConnection = require("./sockets/backend/hub");
const errorHandler = require("./middlewares/500");
const upload = require("./middlewares/multer");
// const ioServer = createSocketConnection(server);



app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// to find suitable handy man and companies 
app.use('/', handymenRouter);
app.use('/', expertiesRouter);
// app.use('/', companyRoutes);



// test payment to pay the sockets and send data to the data base
// app.use("/payment", paymentHandler);
// localhos:3000/payment/1 or 2 or 3 depending on the stag --------sockets

// dashboard
app.use('/',seedRouter)
app.use('/dashboard', dashboard.authenticateAndAuthorize);
app.use('/dashboard',dashboard.getPersonalData)

app.use('/dashupdate', dashboard.authenticateAndAuthorize);
app.use('/dashupdate',dashboard.updatePersonalData);
app.use('/uploadImg', dashboard.authenticateAndAuthorize);
app.use('/uploadImg',upload.single('image'),dashboard.uploadImg);


app.use('/dashdelete', dashboard.authenticateAndAuthorize); 
app.use('/dashdelete', dashboard.deletePersonalData); 

app.use('/', taskRouter);

app.use('/',messagesRoute);


// router for reviews
// app.use("/", reviewRouter);

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));
app.use(signupRoute);
app.use(singinRoute);
app.use(forgotPasswordRoute);
app.use(resetPasswordRoute);
app.use(errorHandler);
app.use(pageNotFound)


function start(port) {
    server.listen(port, () => console.log(`up and running on port: ${port}`));
   
}
module.exports = {
    app,
    start,
    server,
    io,
   
};
