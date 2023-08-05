const experty =(sequelize,DataTypes)=>{
    const model=sequelize.define('experties',{
        name:{
            type:DataTypes.STRING,
            required:true,
        },
    })
    return model;
};
module.exports=experty ;