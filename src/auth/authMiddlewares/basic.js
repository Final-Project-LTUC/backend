"use strict";

const base64 = require("base-64");
const { userModel, handymenModel, companyModel } = require("../../models");
module.exports = async (req, res, next) => {
    const role = req.query.role;
    if (!req.headers.authorization) {
        return _authError();
    }
    let basic = req.headers.authorization.split(" ").pop();
    let [user, pass] = base64.decode(basic).split(":");
    try {
        if (role === "handymen") {
            req.user = await handymenModel.authenticateBasic(
                handymenModel,
                user,
                pass
            );
        } else if (role === "user") {
            req.user = await userModel.authenticateBasic(userModel, user, pass);
        } else if (role === "company") {
            req.user = await companyModel.authenticateBasic(
                companyModel,
                user,
                pass
            );
        }else {
            next('Sorrry the provided model does not exist')
        }
        next();
    } catch (e) {
        console.log(e);
        _authError(e);
    }

    function _authError(e) {
        res.status(403).send("Invalid Login" + e);
    }
};
