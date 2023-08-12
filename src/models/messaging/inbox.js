const inbox=(sequelize,DataTypes)=>{
    const model=sequelize.define('Inbox',{
    lastMessage:{
        type:DataTypes.STRING,
    },
    });
    
  model.findConversation = async function (id,role) {
    if(role==='handyman'){
        try { 
            const inboxes = await inboxParticipantsModel.findAll({where: {HandymanId:id}});
           return inboxes;
          } catch (e) {
            throw new Error(e)
          }
    }else if (role==='user'){
        try { 
            const inboxes = await inboxParticipantsModel.findAll({where: {UserId:id}});
           return inboxes;
          } catch (e) {
            throw new Error(e)
          }
    }
  };
    return model;
};
module.exports=inbox;