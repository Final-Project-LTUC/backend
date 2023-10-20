const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: "Gmail", // Use a service like Gmail or your SMTP server
    auth: {
        user: "apihoteltest@gmail.com",

        pass: "ngynvfnvirvqhvor",
    },
    //apihoteltest@gmail.com
});

module.exports = transporter;
