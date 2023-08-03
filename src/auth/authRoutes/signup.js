"use strict";
require("dotenv").config();
const express = require("express");
const router = express.Router();
const {companies,handymen,users} = require("../../models/index");

const secret = process.env.SECRET;

router.post("/CompanySignup", companySignUp);
router.post("/HandymanSignup", handymanSignUp);
router.post("/UserSignup", userSignUp);

async function companySignUp(req, res) {
    const companyInfo=req.body;
        try {
            const newCompany = await companies.create(companyInfo);
            res.send(newCompany);
        } catch (err) {
            console.log(err);
            console.log("Error:", err);
            res.status(500).send("Internal Server Error");
        }
};
async function handymanSignUp(req, res) {
    const handymanInfo=req.body;
    try {
        const newHandyman = await handymen.create(handymanInfo);
        res.send(newHandyman);
    } catch (err) {
        console.log(err);
        console.log("Error:", err);
        res.status(500).send("Internal Server Error");
    }
}

async function userSignUp(req, res) {
    const userInfo=req.body;
    try {
        const newUser = await users.create(userInfo);
        res.send(newUser);
    } catch (err) {
        console.log(err);
        console.log("Error:", err);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = router;
