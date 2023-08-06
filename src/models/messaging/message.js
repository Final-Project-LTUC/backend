const message=(sequelize,DataTypes)=>{
    const model=sequelize.define('Message',{
        messageContent:{
            type:DataTypes.STRING,
            defaultValue:'',
        },
        created_at:{
            type:DataTypes.STRING,
            required:true,
        },
    });
    return model;
};
module.exports=message;