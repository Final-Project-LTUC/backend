const task =(sequelize,DataTypes)=>{
    const model=sequelize.define('task',{
        title:{
            type:DataTypes.STRING,
            required:true,
        },
        description:{
            type:DataTypes.STRING,
            required:true
        },
        clientName:{
            type:DataTypes.STRING,
            required:true,
        },
        requestTime:{
            type:DataTypes.STRING,
            required:true,
        },
        interval:{
            type:DataTypes.STRING,
            required:false,
            defaultValue:'30'
        },
        phoneNumber:{
            type:DataTypes.BIGINT,
            required:true,
        },
        clientLat:{
            type:DataTypes.STRING,
            required:true,
        },
        clientLong:{
            type:DataTypes.STRING,
            required:true
        },
        taskOrder:{
            type:DataTypes.INTEGER,
            defaultValue:1,
        },
        status:{
            type:DataTypes.STRING,
            defaultValue:'pending'
        },
        ratingOfCustomer:{
            type:DataTypes.INTEGER,
            required:'false',
        },
        ratingOfHandyman:{
            type:DataTypes.INTEGER,
            required:false,
        }
    })
    return model;
};

module.exports=task;

