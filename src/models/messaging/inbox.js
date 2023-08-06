const inbox=(sequelize,DataTypes)=>{
    const model=sequelize.define('Inbox',{
    lastMessage:{
        type:DataTypes.STRING,
    },
    });
    return model;
};
module.exports=inbox;