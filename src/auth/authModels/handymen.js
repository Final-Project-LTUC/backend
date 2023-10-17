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
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        username: { type: DataTypes.STRING, required: true, unique: true },
        phoneNumber: { type: DataTypes.INTEGER, required: true },
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
        profilePicUrl:{
            type:DataTypes.STRING,
        },
        phoneNumber: {
            type: DataTypes.BIGINT,
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
        lat: {
            type: DataTypes.STRING,
            required: true,
        },
        inquiryPrice:{
            type: DataTypes.STRING,
            allowNull: true
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
     
        languages: {
            type: DataTypes.STRING,
            required: false,
            default: "Arabic",
        },
        city: {
            type: DataTypes.STRING,
            required: false,
            default: "amman",
        },
        role: {
            type: DataTypes.ENUM("handyman",'user'),
            required: true,
            defaultValue: "handyman",
        },
        socketId: {
            type: DataTypes.STRING,
          
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
                return jwt.sign({ id:this.id ,username: this.username, role: this.role  }, secret);
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
    
