"use strict";
require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { companies, handymen, users, sequelize } = require("../../models/index");

const secret = process.env.SECRET;

router.post("/CompanySignup", companySignUp);
router.post("/HandymanSignup", handymanSignUp);
router.post("/UserSignup", userSignUp);

async function companySignUp(req, res) {
    // Get the required data from the request body
    let {
        name,
        email,
        password,
        numberOfEmployes,
        // rating,
        // specialization,
        // country,
        // city,
        phoneNumber,
        // alt,
        // long,
        description,
    } = req.body;
    let hashed = await bcrypt.hash(password, 5);

    // Check if the email already exists in the database
    let comAcc = await companies.findOne({ where: { email: email } });
    let userAcc = await users.findOne({ where: { email: email } });

    if (!comAcc && !userAcc) {
        try {
            const newCompany = await companies.create({
                name: name,
                email: email,
                password: hashed,
                numberOfEmployes: numberOfEmployes,
                // rating: rating,
                // specialization: specialization,
                // country: country,
                // city: city,
                phoneNumber: phoneNumber,
                // alt: alt,
                // long: long,
                description: description,
            });

            // Remove sensitive data before sending the response
            delete newCompany.dataValues.password;

            // Generate a token for the new company
            newCompany.dataValues.token = jwt.sign({ email: email }, secret);
            newCompany.dataValues.userType = "company";
            res.send(newCompany);

            // Create an entry in the Users table for this company
            await users.create({
                userType: "company",
                email: email,
            });
        } catch (err) {
            console.log(err);
            console.log("Error:", err);
            res.status(500).send("Internal Server Error");
        }
    } else {
        res.status(409).send("Conflict: Account Already Exists");
    }
}

async function handymanSignUp(req, res) {
    // Get the required data from the request body
    let {
        firstName,
        lastName,
        email,
        password,
        age,
        phoneFLOAT,
        yearsOfExperience,
        hourlyRate,
        alt,
        long,
        rating,
        description,
        languages,
    } = req.body;
    let hashed = await bcrypt.hash(password, 5);

    // Check if the email already exists in the database
    let handymanAcc = await handymen.findOne({ where: { email: email } });
    let userAcc = await users.findOne({ where: { email: email } });

    if (!handymanAcc && !userAcc) {
        try {
            const newHandyman = await handymen.create({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashed,
                age: age,
                phoneFLOAT: phoneFLOAT,
                yearsOfExperience: yearsOfExperience,
                hourlyRate: hourlyRate,
                alt: alt,
                long: long,
                rating: rating,
                description: description,
                languages: languages,
            });

            // Remove sensitive data before sending the response
            delete newHandyman.dataValues.password;

            // Generate a token for the new handyman
            newHandyman.dataValues.token = jwt.sign({ email: email }, secret);
            newHandyman.dataValues.userType = "handyman";
            res.send(newHandyman);

            // Create an entry in the Users table for this handyman
            await users.create({
                userType: "handyman",
                email: email,
            });
        } catch (err) {
            console.log(err);
            console.log("Error:", err);
            res.status(500).send("Internal Server Error");
        }
    } else {
        res.status(409).send("Conflict: Account Already Exists");
    }
}

async function userSignUp(req, res) {
    // Get the required data from the request body
    let {
        username,
        email,
        password,
        phoneNumber,
        alt,
        long,
        rating,
        role,
        languages,
    } = req.body;
    let hashed = await bcrypt.hash(password, 5);

    // Check if the email already exists in the database
    let userAcc = await users.findOne({ where: { email: email } });

    if (!userAcc) {
        try {
            const newUser = await users.create({
                username: username,
                email: email,
                password: hashed,
                phoneNumber: phoneNumber,
                alt: alt,
                long: long,
                rating: rating,
                role: role,
                languages: languages,
            });

            // Remove sensitive data before sending the response
            delete newUser.dataValues.password;

            // Generate a token for the new user
            newUser.dataValues.token = jwt.sign({ email: email }, secret);
            newUser.dataValues.userType = "user";
            res.send(newUser);
        } catch (err) {
            console.log(err);
            console.log("Error:", err);
            res.status(500).send("Internal Server Error");
        }
    } else {
        res.status(409).send("Conflict: Account Already Exists");
    }
}

module.exports = router;
