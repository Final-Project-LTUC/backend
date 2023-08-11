"use strict";
require("dotenv").config();
const { db } = require("./src/models");
const { start } = require("./src/server");
const PORT = process.env.PORT || 3000;

db.sync()
    .then(() => {
        
        start(PORT);
    })
    .catch((error) => console.log(error));
