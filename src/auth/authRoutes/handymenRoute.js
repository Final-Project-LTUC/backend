'use strict';

const express = require('express');
const authRouter = express.Router();
const { users } = require('../models');
const basicAuth = require('./middleware/basic.js')
authRouter.post('/signup', async (req, res, next) => {
    const isFreelancer=req.query.isFreelancer;
    if(isFreelancer){
        try {
            let userRecord = await users.create(req.body);
            const output = {
              user: userRecord,
              token: userRecord.token
            };
            res.status(201).json(output);
          } catch (e) {
            next(e.message)
          }
    }else {
        
    }

});

authRouter.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token
  };
  res.status(200).json(user);
});
module.exports = authRouter;
