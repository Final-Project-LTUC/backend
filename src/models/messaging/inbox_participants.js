const { Op } = require("sequelize");
const { inboxModel } = require("..");
const inboxParticipants = (sequelize, DataTypes) => {
  const model = sequelize.define("inbox_participants", {});

  return model;
};

module.exports = inboxParticipants;
