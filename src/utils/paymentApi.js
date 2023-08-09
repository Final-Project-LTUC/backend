'use strict';
const express = require('express');
const router = express.Router();

function sendPaymentStatus(res) {
    res.json({ paymentStatus: true ,amount : 20});
}

function payment1(req, res) {
    sendPaymentStatus(res);
}

function payment2(req, res) {
    sendPaymentStatus(res);
}

function payment3(req, res) {
    sendPaymentStatus(res);
}

router.get('/1', payment1);
router.get('/2', payment2);
router.get('/3', payment3);

module.exports = router;