'use strict';

const { userModel,handymenModel,companyModel } = require('../../models')

module.exports =(model)=>{
  return async (req, res, next) => {
    try {
      if (!req.headers.authorization) { authError() }
      const token = req.headers.authorization.split(' ').pop(); 
      const validUser = await model.authenticateToken(model,token);
      req.user = validUser;
      req.token = validUser.token;
      next();
    } catch (e) {
      console.log(e)
      next('Invalid Token')
    }
  }
};
