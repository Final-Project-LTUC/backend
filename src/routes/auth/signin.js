// "use strict";
// const express = require("express");
// const base64 = require("base-64");
// const router = express.Router();
// const { companies, Handymen, Users } = require("../../models/index.js");

// router.post("/signin", signIn);

// async function signIn(req, res) {
//     if (req.headers["authorization"]) {
//         let base = req.headers.authorization.split(" ");
//         let userpassEncoded = base.pop();
//         let userpassDecoded = base64.decode(userpassEncoded).split(":");
//         let [email, password] = userpassDecoded;
//         let userD = await Users.findOne({ where: { email: email } });

//         if (userD) {
//             if (userD.userType == "company") {
//                 companies
//                     .auth(email, password)
//                     .then((result) => {
//                         try {
//                             delete result.dataValues.password;
//                             result.dataValues.userType = "company";
//                             res.send(result.dataValues);
//                         } catch (err) {
//                             res.send("Wrong Password");
//                         }
//                     })
//                     .catch((err) => {
//                         throw err;
//                     });
//             } else if (userD.userType == "handyman") {
//                 Handymen.auth(email, password)
//                     .then((result) => {
//                         try {
//                             delete result.dataValues.password;
//                             result.dataValues.userType = "handyman";
//                             res.send(result.dataValues);
//                         } catch (err) {
//                             res.send("Wrong Password");
//                         }
//                     })
//                     .catch((err) => {
//                         throw err;
//                     });
//             } else if (userD.userType == "user") {
//                 Users.auth(email, password)
//                     .then((result) => {
//                         try {
//                             delete result.dataValues.password;
//                             result.dataValues.userType = "user";
//                             res.send(result.dataValues);
//                         } catch (err) {
//                             res.send("Wrong Password");
//                         }
//                     })
//                     .catch((err) => {
//                         throw err;
//                     });
//             } else {
//                 console.log("ERROR");
//             }
//         } else {
//             res.send("User not found!");
//         }
//     } else {
//         res.send("Headers Error!");
//     }
// }

// module.exports = router;
