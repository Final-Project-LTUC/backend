"use strict";
const {authenticateToken,authenticateBasic}=require('../../utils/authUsers');
const userModel = (sequelize, DataTypes) => {
  const model = sequelize.define("Users", {
    username: { type: DataTypes.STRING, required: true, unique: true },
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
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
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
        return jwt.sign({ username: this.username }, SECRET);
      },
      set(tokenObj) {
        let token = jwt.sign(tokenObj, SECRET);
        return token;
      },
    },
  });

  model.beforeCreate(async (user) => {
    let hashedPass = await bcrypt.hash(user.password, 10);
    user.password = hashedPass;
  });
  model.authenticateBasic = authenticateBasic;
  model.authenticateToken =authenticateToken;
  return model;
};

module.exports = userModel;
