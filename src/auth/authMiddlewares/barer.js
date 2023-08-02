'use strict';

const { users } = require('../authModels/users')

module.exports = async (req, res, next) => {

  try {

    if (!req.headers.authorization) { authError() }

    const token = req.headers.authorization.split(' ').pop();
    const validUser = await users.model.authenticateToken(token);
    req.user = validUser;
    req.token = validUser.token;
    next();

  } catch (e) {
    console.log(e)
    authError();
  }

  function authError() {
    next('Invalid Login');
  }
}
