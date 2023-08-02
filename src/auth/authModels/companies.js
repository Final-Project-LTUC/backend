"use strict";
const {authenticateToken,authenticateBasic}=require('../../utils/authUsers');
const companies = (sequelize, DataTypes) => {
  const model = sequelize.define("companies", {
    name: {
      type: DataTypes.STRING,
      required: true,
    },
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
module.exports = companies;
