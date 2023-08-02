"use strict";
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { company, users } = require("../../models/index.js");
const jwt = require("jsonwebtoken");
router.post("/CompanySignup", signUp);

require("dotenv").config();
const secret = process.env.SECRET;
async function signUp(req, res) {
    let {
        name,
        email,
        password,
        specialization,
        country,
        city,
        purl,
        phoneNum,
        about,
        profilePicture,
    } = req.body;
    let hashed = await bcrypt.hash(password, 5);
    let comAcc = await company.findOne({ where: { email: email } });
    let userAcc = await users.findOne({ where: { email: email } });
    if (!comAcc && !userAcc) {
        try {
            const comAcc = await company
                .create({
                    name: name,
                    email: email,
                    password: hashed,
                    specialization: specialization,
                    country: country,
                    city: city,

                    phoneNum: phoneNum,
                    about: about,
                    profilePicture: profilePicture,
                })
                .then((result) => {
                    delete result.dataValues.password;
                    delete result.dataValues.profilePicture;

                    (result.dataValues.token = jwt.sign(
                        { email: email },
                        secret
                    )),
                        (result.dataValues.userType = "company");
                    res.send(result.dataValues);
                });
            await users.create({
                userType: "company",
                email: email,
            });
        } catch (err) {
            console.log(err);
        }
    } else {
        res.status(409).send("Failed");
    }
}

module.exports = router;
