"use strict";
require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const {
    handyman,
    users,
    skill,
    handymanskills,
} = require("../../models/index.js");

router.post("/HandymanSignup", signUp);
const secret = process.env.SECRET;

async function signUp(req, res) {
    let {
        email,
        password,
        name,
        role,
        skillsID,
        profilePicture,
        about,
        phoneNum,
    } = req.body;
    let hashed = await bcrypt.hash(password, 5);
    let handymanAcc = await handyman.findOne({ where: { email: email } });
    let userAcc = await users.findOne({ where: { email: email } });

    if (!handymanAcc && !userAcc) {
        try {
            const newHandyman = await handyman.create({
                email: email,
                password: hashed,
                name: name,
                role: role,

                about: about,
                phoneNum: phoneNum,
                profilePicture: profilePicture,
            });

            delete newHandyman.dataValues.password;
            delete newHandyman.dataValues.profilePicture;
            newHandyman.dataValues.token = jwt.sign({ email: email }, secret);
            newHandyman.dataValues.userType = "handyman";

            await users.create({
                userType: "handyman",
                email: email,
            });

            skillsID = JSON.parse(skillsID);
            const ids = skillsID.map((str) => parseInt(str));

            ids.forEach(async (id) => {
                const row = await skill.findOne({ where: { id } });
                await newHandyman.addSkill(row);
            });

            res.send(newHandyman);
        } catch (err) {
            console.log(err.message);
            res.send(err.message);
        }
    } else {
        res.status(409).send("failed");
    }
}

module.exports = router;
