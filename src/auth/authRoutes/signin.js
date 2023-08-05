"use strict";
const express = require("express");
const base64 = require("base-64");
const router = express.Router();
const { companies, handymen, users } = require("../../models/index.js");

router.post("/signin", signIn);

async function signIn(req, res) {
    if (req.headers["authorization"]) {
        try {
            let base = req.headers.authorization.split(" ");
            let userpassEncoded = base.pop();
            let userpassDecoded = base64.decode(userpassEncoded).split(":");
            let [email, password] = userpassDecoded;
            let userD = await users.findOne({ where: { email: email } });
            let companyD = await companies.findOne({ where: { email: email } });
            let handyD = await handymen.findOne({ where: { email: email } });

            console.log({ userD });

            if (userD) {
                users
                    .auth(email, password)
                    .then((result) => {
                        try {
                            delete result.dataValues.password;
                            res.send(result.dataValues);
                        } catch (err) {
                            res.send("Wrong Password");
                        }
                    })
                    .catch((err) => {
                        throw err;
                    });
            } else if (companyD) {
                companies
                    .auth(email, password)
                    .then((result) => {
                        try {
                            //delete result.dataValues.password;
                            res.send(result);
                        } catch (err) {
                            res.send("Wrong Password");
                        }
                    })
                    .catch((err) => {
                        throw err;
                    });
            } else if (handyD) {
                handymen
                    .auth(email, password)
                    .then((result) => {
                        try {
                            delete result.dataValues.password;
                            res.send(result.dataValues);
                        } catch (err) {
                            res.send("Wrong Password");
                        }
                    })
                    .catch((err) => {
                        throw err;
                    });
            } else {
                console.log("ERROR");
            }
        } catch (err) {
            console.log(err);
            res.json(err);
        }
    } else {
        res.send("Headers Error!");
    }
}

module.exports = router;
