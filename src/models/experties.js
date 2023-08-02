const experties =(sequelize,DataTypes)=>{
    const model=sequelize.define('experties',{
        name:{
            type:DataTypes.STRING,
            required:true,
        },
        expertiyID:{
            type:DataTypes.INTEGER,
            required:true,
        }
    })
};
module.exports=experties;