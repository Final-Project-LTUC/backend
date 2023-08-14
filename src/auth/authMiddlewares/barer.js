'use strict';
const jwt=require('jsonwebtoken');
const SECRET=process.env.SECRET;
module.exports =(model)=>{
  return async (req, res, next) => {
    try {
      if (!req.headers.authorization) { authError() }
      const token = req.headers.authorization.split(' ').pop();
      const validUser = await model.authenticateToken(model,token);
      console.log(isTokenExpired(token))
      if(validUser&&isTokenExpired(token)){
        const newToken=  generateToken({username:validUser.username});
        req.token=newToken;
        req.user=validUser;
        next();
      }else {
        req.token=token;
        req.user=validUser;
        next();
      }
    } catch (e) {
      console.log(e)
      next('Invalid Token')
    };
  };
};
function isTokenExpired(token) {//each token has expiration date ,compare that expiration date to the current date then based on that return yes or no
  try {
    const decoded = jwt.verify(token, SECRET);
    const currentTimestamp = Math.floor(Date.now() / 1000); // Convert the time  to seconds
    return decoded.exp < currentTimestamp;
  } catch (error) {
    return true; 
  }
}
function generateToken(payload) {
  const expirationTime = '1h'; 
  return jwt.sign(payload, SE, { expiresIn: expirationTime });
}

