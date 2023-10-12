
const signin = require("./signin");
const signup = require("./signup");
const forgotPassword = require("./forgotPassword");
const resetPassword = require("./resetPassword");

module.exports = {
    signupRoute: signup,
    singinRoute: signin,
    forgotPasswordRoute: forgotPassword,
    resetPasswordRoute: resetPassword,
};
