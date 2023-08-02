"use strict";
const SECRET = process.env.SECRET || "secretstring";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
async function authenticateBasic (username,password){
    const user = await this.findOne({ where: { username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      return user;
    }
    throw new Error("Invalid User");
};
async function authenticateToken(token){
    try {
        const parsedToken = jwt.verify(token, SECRET);
        const user = this.findOne({ where: { username: parsedToken.username } });
        if (user) {
          return user;
        }
        throw new Error("User Not Found");
      } catch (e) {
        throw new Error(e.message);
      }
};
module.exports={
    authenticateBasic,
    authenticateToken,
}