'use strict';

const { userModel,handymenModel,companyModel } = require('../../models')

module.exports = async (req, res, next) => {

  try {

    if (!req.headers.authorization) { authError() }

    const token = req.headers.authorization.split(' ').pop();
    const validUser = await userModel.authenticateToken(userModel,token);
    
    req.user = validUser;
    req.token = validUser.token;
    next();

  } catch (e) {
    console.log(e)
    authError();
  }

  function authError() {
    next('Invalid tokken');
  }
}
