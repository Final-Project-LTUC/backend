const message=(sequelize,DataTypes)=>{
    const model=sequelize.define('Message',{
        messageContent:{
            type:DataTypes.STRING,
            defaultValue:'',
        },
        sentAt:{
            type:DataTypes.STRING,
            required:true,
        },
    });
    
  model.findConversation = async function (userId) {
    try { 
      const inboxes = await model.findAll({
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
module.exports=message;