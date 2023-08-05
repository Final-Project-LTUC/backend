"use strict";
require("dotenv").config();
const express = require("express");
const router = express.Router();
const { companyModel,  handymenModel, userModel } = require("../../models/index");
router.post("/CompanySignup", companySignUp);
router.post("/HandymanSignup", handymanSignUp);
router.post("/UserSignup", userSignUp);

async function companySignUp(req, res) {
    const companyInfo = req.body;
    try {
        const newCompany = await companyModel.create(companyInfo);
        res.send(newCompany);
    } catch (err) {
        console.log(err);
        console.log("Error:", err);
        res.status(500).send("Internal Server Error");
    }
}
async function handymanSignUp(req, res) {
    const handymanInfo = req.body;
    try {
        const newHandyman = await  handymenModel.create(handymanInfo);
        res.send(newHandyman);
    } catch (err) {
        console.log(err);
        console.log("Error:", err);
        res.status(500).send("Internal Server Error");
    }
}

async function userSignUp(req, res) {
    const userInfo = req.body;
    try {
        const newUser = await usersModel.create(userInfo);
        res.send(newUser);
    } catch (err) {
        console.log(err);
        console.log("Error:", err);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = router;
