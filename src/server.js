"use strict";

require("dotenv").config();
// require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const taskRouter = require("./routes/task");
const seedRouter = require("./routes/seed");
const pageNotFound = require("./middlewares/404");
const serverError = require("./middlewares/404");
const {
    signupRoute,
    singinRoute,
    forgotPasswordRoute,
    resetPasswordRoute,
} = require("./auth/authRoutes");
const listEndpoints = require("express-list-endpoints");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const logger = require("./middlewares/logger");
const handymenRouter = require("./routes/handymenRoutes");

const companySignUp = require("./auth/authRoutes/signup");
app.use(companySignUp);
signupRoute.post("/CompanySignup", companySignUp);

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/handymen", handymenRouter);

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));
app.use(signupRoute);
app.use(singinRoute);
app.use(forgotPasswordRoute);
app.use(resetPasswordRoute);

app.use("*", pageNotFound);
app.use(serverError);

// console.log(listEndpoints(app));

function start(port) {
    app.listen(port, () => console.log(`up and running on port: ${port}`));
}
module.exports = {
    app,
    start,
};
