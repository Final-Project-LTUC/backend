"use strict";
const express = require("express");
const base64 = require("base-64");
const router = express.Router();
const basicAuth=require('../authMiddlewares/basic');

router.post("/signin",basicAuth,(req,res,next)=>{
res.send(req.user);
});

// async function signIn(req, res) {
//     if (req.headers["authorization"]) {
//         try {
//             let base = req.headers.authorization.split(" ");
//             let userpassEncoded = base.pop();
//             let userpassDecoded = base64.decode(userpassEncoded).split(":");
//             let [email, password] = userpassDecoded;
//             let userD = await userModel.findOne({ where: { email: email } });
//             let companyD = await companyModel.findOne({ where: { email: email } });
//             let handyD = await handymenModel.findOne({ where: { email: email } });

//             console.log({ userD });

//             if (userD) {
//                 userModel
//                     .authinticateBasic(userModel,email, password)
//                     .then((result) => {
//                         try {
//                             delete result.dataValues.password;
//                             res.send(result.dataValues);
//                         } catch (err) {
//                             res.send("Wrong Password");
//                         }
//                     })
//                     .catch((err) => {
//                         throw err;
//                     });
//             } else if (companyD) {
//                 companyModel
//                     .authinticateBasic(companyModel,email, password)
//                     .then((result) => {
//                         try {
//                             //delete result.dataValues.password;
//                             res.send(result);
//                         } catch (err) {
//                             res.send("Wrong Password");
//                         }
//                     })
//                     .catch((err) => {
//                         throw err;
//                     });
//             } else if (handyD) {
//                 handymenModel
//                     .authinticateBasic(handymenModel,email, password)
//                     .then((result) => {
//                         try {
//                             delete result.dataValues.password;
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
//         } catch (err) {
//             console.log(err);
//             res.json(err);
//         }
//     } else {
//         res.send("Headers Error!");
//     }
// }

module.exports = router;
