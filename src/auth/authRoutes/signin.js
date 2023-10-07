"use strict";
const express = require("express");
const base64 = require("base-64");
const router = express.Router();
const basicAuth=require('../authMiddlewares/basic');
router.post("/signin",basicAuth,(req,res,next)=>{
res.send(req.user);
});



module.exports = router;
