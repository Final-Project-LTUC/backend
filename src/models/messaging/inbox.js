const inbox=(sequelize,DataTypes)=>{
    const model=sequelize.define('Inbox',{
    lastMessage:{
        type:DataTypes.STRING,
    },
    });
    
  model.findConversation = async function (id,role) {
    if(role==='handyman'){
        try { 
          console.log('handyman')
            const inboxes = await model.findAll({where: {HandymanId:id}});
           return inboxes;
          } catch (e) {
            throw new Error(e)
          }
    }else if (role==='user'){
        try { 
          console.log('user')
            const inboxes = await model.findAll({where: {UserId:id}});
           return inboxes;
          } catch (e) {
            throw new Error(e)
          }
    }else {
      console.log('no role ')
      throw new Error('Please Provide Your Role')
    }
  };
    return model;
};
module.exports=inbox;