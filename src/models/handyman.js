const { DataTypes } = require("sequelize");
const sequelize = require("../database/connection");

const Handyman = sequelize.define("handyman", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    about: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    phoneNum: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    profilePicture: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = Handyman;
