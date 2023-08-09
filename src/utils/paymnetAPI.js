'use strict';

const express = require('express');
const router = express.Router();

function sendPaymentStatus(res) {
    res.json({ paymentStatus: true });
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

router.get('/payment1', payment1);
router.get('/payment2', payment2);
router.get('/payment3', payment3);
module.exports = router;