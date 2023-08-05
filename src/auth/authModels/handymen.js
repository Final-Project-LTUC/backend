"use strict";
const {authenticateToken,authenticateBasic}=require('../../utils/authUsers');
const handymenModel = (sequelize, DataTypes) => {
  const model = sequelize.define("Handymen", {
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
    // profileImgLink: {},
    languages: {
      type: DataTypes.STRING,
      required: false,
      default: "Arabic",
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
  });
  model.authenticateBasic = authenticateBasic;
  model.authenticateToken =authenticateToken;
  return model;
};
module.exports = handymenModel;
