"use strict";
require("dotenv").config();
const {server} = require("./src/server")
const {io} = require("./src/server")
const { db } = require("./src/models");
const { start } = require("./src/server");
const PORT = process.env.PORT || 3000;

db.sync()
    .then(() => {
     
        start(PORT);
    })
    .catch((error) => console.log(error));

// db.sync()
//     .then(() => {
//         start(PORT);
//     })
//     .catch((error) => console.log(error));
