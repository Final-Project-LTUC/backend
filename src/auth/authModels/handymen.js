"use strict";
const secret = process.env.SECRET;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
    authenticateToken,
    authenticateBasic,
} = require("../../utils/authUsers");
const handymenModel = (sequelize, DataTypes) => {
    const model = sequelize.define("Handyman", {
        username: { type: DataTypes.STRING, required: true, unique: true },

        firstName: {
            type: DataTypes.STRING,
            required: true,
        },
        password: { type: DataTypes.STRING, required: true },

        lastName: {
            type: DataTypes.STRING,
            required: true,
        },
        age: {
            type: DataTypes.INTEGER,
            required: true,
        },
        email: {
            type: DataTypes.STRING,
            required: true,
           
            unique: true,
        },
        phoneFLOAT: {
            type: DataTypes.INTEGER,
            required: true,
        },
        yearsOfExperience: {
            type: DataTypes.FLOAT,
            required: false,
            defaultValue: 1,
        },
        hourlyRate: {
            type: DataTypes.FLOAT,
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
        rating: {
            type: DataTypes.FLOAT,
            required: false,
            default: 5,
        },
        description: {
            type: DataTypes.STRING,
            required: false,
            default: "",
        },
        genreId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'experties', // Make sure to match the name of your experty model
                key: 'id',
            },
        },
  
        // profileImgLink: {},
        languages: {
            type: DataTypes.STRING,
            required: false,
            default: "Arabic",
        },
        role: {
            type: DataTypes.ENUM("handyman",'user'),
            required: true,
            defaultValue: "handyman",
        },
        capabilities: {
            type: DataTypes.VIRTUAL,
            get() {
                const acl = {
                    handyman: ["read", "create", "update", "delete"],
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

    return model;
};
module.exports = handymenModel;
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
