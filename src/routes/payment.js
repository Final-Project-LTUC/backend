// const express = require("express");
// const paypal = require("paypal-rest-sdk");
// const router = express.Router();

// paypal.configure({
//     mode: "sandbox", //sandbox or live
//     client_id:
//         "AcyIAQLKbRXdOcNfWFPE1wpV5bs7ILj4RlL8kNemuObX2SZC-9EJx0qB8sKskSc2AcuFy_Nc_TpaH_lc",
//     client_secret:
//         "EB6WLpykxU28mFPAup2B6rlGuPw9QltUpYlUWCeq7N7NHVUyZHieToyEH7grrRXtucnEytUrYySLn2SU",
// });

// app.post("/pay", (req, res) => {
//     const create_payment_json = {
//         intent: "sale",
//         payer: {
//             payment_method: "paypal",
//         },
//         redirect_urls: {
//             return_url: "http://localhost:3000/success",
//             cancel_url: "http://localhost:3000/cancel",
//         },
//         transactions: [
//             {
//                 item_list: {
//                     items: [
//                         {
//                             name: "Red Sox Hat",
//                             sku: "001",
//                             price: "50.00",
//                             currency: "USD",
//                             quantity: 1,
//                         },
//                     ],
//                 },
//                 amount: {
//                     currency: "USD",
//                     total: "50.00",
//                 },
//                 description: "Hat for the best team ever",
//             },
//         ],
//     };
//     app.get("/success", (req, res) => {
//         const payerId = req.query.PayerID;
//         const paymentId = req.query.paymentId;

//         const execute_payment_json = {
//             payer_id: payerId,
//             transactions: [
//                 {
//                     amount: {
//                         currency: "USD",
//                         total: "25.00",
//                     },
//                 },
//             ],
//         };

//         paypal.payment.execute(
//             paymentId,
//             execute_payment_json,
//             function (error, payment) {
//                 if (error) {
//                     console.log(error.response);
//                     throw error;
//                 } else {
//                     console.log(JSON.stringify(payment));
//                     res.send("Success");
//                 }
//             }
//         );
//     });
//     paypal.payment.create(create_payment_json, function (error, payment) {
//         if (error) {
//             throw error;
//         } else {
//             for (let i = 0; i < payment.links.length; i++) {
//                 if (payment.links[i].rel === "approval_url") {
//                     res.redirect(payment.links[i].href);
//                 }
//             }
//         }
//     });
// });
// app.get("/cancel", (req, res) => res.send("Cancelled"));
