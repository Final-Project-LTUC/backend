"use strict";
const employees = (sequelize, DataTypes) => {
  const model = sequelize.define("employees", {
    firstName: {
      type: DataTypes.STRING,
      required: true,
    },
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
    },//test
    phoneNumber: {
      type: DataTypes.INTEGER,
      required: true,
    },
    yearsOfExperience: {
      type: DataTypes.NUMBER,
      required: false,
      defaultValue: 1,
    },
    alt: {
      type: DataTypes.STRING,
      required: true,
    },
    rating: {
      type: DataTypes.NUMBER,
      required: false,
      default: 5,
    },
    description: {
      type: DataTypes.STRING,
      required: false,
      default: "",
    },
    // profileImgLink: {},
    languages: {
      type: DataTypes.STRING,
      required: false,
      default: "Arabic",
    },
  });
  return model;
};
module.exports = employees;
