"use strict";
const secret = process.env.SECRET;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
    authenticateToken,
    authenticateBasic,
} = require("../../utils/authUsers");
const company = (sequelize, DataTypes) => {
    const model = sequelize.define("companies", {
        username: { type: DataTypes.STRING, required: true, unique: true },
        name: {
            type: DataTypes.STRING,
            required: true,
        },
        password: { type: DataTypes.STRING, required: true },

        numberOfEmployes: {
            type: DataTypes.STRING,
            required: true,
        },
        rating: {
            type: DataTypes.INTEGER,
            required: true,
        },
        email: {
            type: DataTypes.STRING,
            required: true,
            primaryKey: true,
            unique: true,
        },
        phoneNumber: {
            type: DataTypes.INTEGER,
            required: true,
        },
        alt: {
            type: DataTypes.STRING,
            required: true,
        },
        long: {
            type: DataTypes.STRING,
            required: true,
        },

        description: {
            type: DataTypes.STRING,
            required: false,
            default: "",
        },
        role: {
            type: DataTypes.ENUM("company",'user'),
            required: true,
            defaultValue: "company",
        },
        capabilities: {
            type: DataTypes.VIRTUAL,
            get() {
                const acl = {
                    company: ["read", "create", "update", "delete"],
                    user: ["read"],
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
    //                 console.log(valid);
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
module.exports = company;
