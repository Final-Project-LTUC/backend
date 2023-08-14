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
        genreId: {
            type: DataTypes.INTEGER,
            
            references: {
                model: 'experties', // Make sure to match the name of your experty model
                key: 'id',
            },
        },
        genreId2: {
            type: DataTypes.INTEGER,
            
            references: {
                model: 'experties', // Make sure to match the name of your experty model
                key: 'id',
            },
        },
        role: {
            type: DataTypes.ENUM("company"),
            required: true,
            defaultValue: "company",
        },
        capabilities: {
            type: DataTypes.VIRTUAL,
            get() {
                const acl = {
                    company: ["read", "create", "update", "delete"],
                  
                };
                return acl[this.role];
            },
        },
        token: {
            type: DataTypes.VIRTUAL,
            get() {
                return jwt.sign({ username: this.username }, secret,{expiresIn:'1s'});
            },
            set(tokenObj) {
                let token = jwt.sign(tokenObj, secret,{ expiresIn: 3600 });
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
module.exports = company;
