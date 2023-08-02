"use strict";

/// require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const pageNotFound = require("./middlewares/404");
const serverError = require("./middlewares/500");
const logger = require('./middlewares/logger')


app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("*", pageNotFound);
app.use(serverError);

function start(port) {
  app.listen(port, () => console.log(`up and running on port: ${port}`));
}

module.exports = {
  app,
  start,
};