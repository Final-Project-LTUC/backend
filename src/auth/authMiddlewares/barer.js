"use strict";
module.exports = (model) => {
    return async (req, res, next) => {
        try {
            if (!req.headers.authorization) {
                console.log("no auth");
            } else {
                const token = req.headers.authorization.split(" ").pop();
                console.log({ typeoftoken: token });
                const validUser = await model.authenticateToken(model, token);
                req.user = validUser;
                req.token = validUser.token;
                next();
            }
        } catch (e) {
            console.log(e);
            next("Invalid Token" + e);
        }
    };
};
