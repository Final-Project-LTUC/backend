"use strict";
require("dotenv").config();
const express = require("express");
const router = express.Router();
const  {expertise_handymanModel}=require('../../models')
const {
    companyModel,
    handymenModel,
    userModel,
} = require("../../models/index");
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
        next(err);
    }
}

async function handymanSignUp(req, res,next) {
    const handymanInfo = req.body;
    try {
        const newHandyman = await handymenModel.create({
            ...handymanInfo,
            email: handymanInfo.email.toLowerCase(),
        });
        handymanInfo.experties.forEach(async e=>{
            await expertise_handymanModel.create({HandymanId:newHandyman.id,ExpertyId:e});
        });
        res.send(newHandyman);
    } catch (err) {
            next(err);
    }
}

async function userSignUp(req, res,next) {
    const userInfo = req.body;
    try {
        const newUser = await userModel.create({
            ...userInfo,
            email: userInfo.email.toLowerCase(),
        });
        res.send(newUser);
    } catch (err) {
        next(err);
    }
}

module.exports = router;
