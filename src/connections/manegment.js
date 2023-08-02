'use strict';


require('dotenv').config();
const port = process.env.PORT || 3001 ;
const ioServer = require('socket.io')(port);