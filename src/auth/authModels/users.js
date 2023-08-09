"use strict";
require("dotenv").config();
const {
    authenticateToken,
    authenticateBasic,
} = require("../../utils/authUsers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const user = (sequelize, DataTypes) => {
    const model = sequelize.define("Users", {
        username: { type: DataTypes.STRING, required: true,unique:true },
        password: { type: DataTypes.STRING, required: true },
        phoneNumber: { type: DataTypes.INTEGER, required: true },
        // profileImgLink: {},
        languages: {
            type: DataTypes.STRING,
            required: false,
            default: "Arabic",
        },
        alt: {
            type: DataTypes.STRING,
            required: true,
        },
        long: {
            type: DataTypes.STRING,
            required: true,
        },
        email: {
            type: DataTypes.STRING,
            required: true,
            primaryKey: true,
            unique:true
        },
        phoneNumber: {
            type: DataTypes.BIGINT,
            required: true,
        },
        rating: {
            type: DataTypes.INTEGER,
            required: false,
            default: 5,
        },
        role: {
            type: DataTypes.ENUM("vistor", "user"),
            required: true,
            defaultValue: "vistor",
        },

        capabilities: {
            type: DataTypes.VIRTUAL,
            get() {
                const acl = {
                    user: ["read", "create", "update", "delete"],
                    vistor: ["read"],
                };
                return acl[this.role];
            },
        },
        token: {
            type: DataTypes.VIRTUAL,
            get() {
                return jwt.sign({ username: this.username }, secret);
            },
            set(tokenObj) {
                let token = jwt.sign(tokenObj, secret);
                return token;
            },
        },
    });

    model.beforeCreate(async (user) => {
        let hashedPass = await bcrypt.hash(user.password, 10);
        user.password = hashedPass;
    });
    model.authenticateBasic = authenticateBasic;
    model.authenticateToken = authenticateToken;

    // model.auth = async function (email, hashedPassword) {
    //     try {
    //         let userD = await this.findOne({ where: { email: email } });
    //         if (userD) {
    //             let valid = await bcrypt.compare(
    //                 hashedPassword,
    //                 userD.password
    //             );
    //             if (valid) {
    //                 let newToken = jwt.sign({ email: userD.email }, secret);
    //                 userD.token = newToken;
    //                 return userD;
    //             } else {
    //                 return "wrong password!";
    //             }
    //         } else {
    //             return "invalid user!";
    //         }
    //     } catch (err) {
    //         return err;
    //     }
    // };
    return model;
};

module.exports = user;
