"use strict";
require("dotenv").config();
const express = require("express");
const router = express.Router();
const { companyModel,  handymenModel, userModel } = require("../../models/index");
router.post("/signupcompany", companySignUp);
router.post("/signuphandyman", handymanSignUp);
router.post("/signupuser", userSignUp);

async function companySignUp(req, res) {
    const companyInfo = req.body;
    try {
        const newCompany = await companyModel.create({
            ...companyInfo,
            email: companyInfo.email.toLowerCase(),
        });
        res.send(newCompany);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Internal Server Error");
    }
}

async function handymanSignUp(req, res) {
    const handymanInfo = req.body;
    try {
        const newHandyman = await handymenModel.create({
            ...handymanInfo,
            email: handymanInfo.email.toLowerCase(),
        });
        res.send(newHandyman);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Internal Server Error");
    }
}

async function userSignUp(req, res) {
    const userInfo = req.body;
    try {
        const newUser = await userModel.create({
            ...userInfo,
            email: userInfo.email.toLowerCase(),
        });
        res.send(newUser);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = router;
