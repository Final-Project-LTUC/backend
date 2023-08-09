// authUsers.js

const SECRET = process.env.SECRET || "secretstring";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function authenticateBasic(model, username, password) {
    const user = await model.findOne({ where: { username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
        return user;
    }
    throw new Error("Invalid User");
}

//TO test the token expirety
function generateToken(user) {
    const payload = {
        exp: Math.floor(Date.now() / 1000) + 60, // Set token to expire in 60 seconds for testing
    };

    const token = jwt.sign(payload, SECRET);
    return token;
}
//TO test the token expirety

async function authenticateToken(model, token) {
    try {
        const parsedToken = jwt.verify(token, SECRET);
        const user = await model.findOne({
            where: { username: parsedToken.username },
        });

        // Check if the token is still valid  , how i can know that this line is working well , i let chatgpt type it b
        if (parsedToken.exp < Math.floor(Date.now() / 1000)) {
            throw new Error("Token has expired");
        }

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
    generateToken,
    authenticateToken,
};
