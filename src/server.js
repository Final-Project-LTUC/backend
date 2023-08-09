"use strict";

require('dotenv').config();
// require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const taskRouter=require('./routes/task');~
const seedRouter=require('./routes/seed');
const pageNotFound=require('./middlewares/404');
const serverError=require('./middlewares/404');
const {signupRoute,singinRoute}=require('./auth/authRoutes');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const logger = require("./middlewares/logger");
const handymenRouter = require('./routes/handymenRoutes'); 
const paymentHandler = require('./utils/paymentApi')
const companySignUp = require("./auth/authRoutes/signup"); 
app.use(companySignUp);
signupRoute.post("/CompanySignup", companySignUp);

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/handymen', handymenRouter);
app.use('/payment', paymentHandler);
app.use('/handymen', handymenRouter);
app.use('/handymen', handymenRouter);
app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));
app.use(signupRoute);
app.use(singinRoute);
app.use("*", pageNotFound);
app.use(serverError);

function start(port) {
    app.listen(port, () => console.log(`up and running on port: ${port}`));
}
module.exports = {
    app,
    start,
};
