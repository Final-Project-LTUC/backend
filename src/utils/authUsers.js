"use strict";
const SECRET = process.env.SECRET || "secretstring";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
async function authenticateBasic(model, username, password) {
    const user = await model.findOne({ where: { username } });
    
    const valid = await bcrypt.compare(password, user.password);

    console.log(username,password,user,"VAAAAAAAAAAAAlid")

    if (valid) {
        console.log(valid,"VAAAAAAAAAAAAlid")
        return user;
    }
    throw new Error("Invalid User");
}
async function authenticateToken(model, token) {
    try {
        const parsedToken = jwt.verify(token, SECRET);
        const user = model.findOne({
            where: { username: parsedToken.username },
        });
        if (user) {
            return user;
        }
        throw new Error("User Not Found");
    } catch (e) {
        throw new Error(e.message);
    }
}
module.exports = {
    authenticateBasic,
    authenticateToken,
};
