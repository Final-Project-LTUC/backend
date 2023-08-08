const { Op } = require("sequelize");
const { inboxModel } = require("..");
const inboxParticipants = (sequelize, DataTypes) => {
  const model = sequelize.define("inbox_participants", {});

  model.findConversation = async function (userId) {
    try { 
      const inboxes = await inboxParticipantsModel.findAll({
        where: {
          [Op.or]: [{ user1Id: userId }, { user2Id: userId }],
        },
        include: {
          model: inboxModel,
        },
      });
     return inboxes;
    } catch (e) {
      throw new Error(e)
    }
  };
  return model;
};

module.exports = inboxParticipants;
