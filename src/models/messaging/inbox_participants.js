const { Op } = require("sequelize");
const inboxParticipants = (sequelize, DataTypes) => {
  const model = sequelize.define("inbox_participants", {});

  model.findConversation = async function (userId) {
    const conversation = await model.findOne({
      where: {
        [Op.or]: [
          { user1_id: userId },
          { user2_id: userId }
        ]
      },
    });
    return conversation;
  };
  return model;
};

module.exports = inboxParticipants;
