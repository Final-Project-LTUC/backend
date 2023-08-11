const task =(sequelize,DataTypes)=>{
    const model=sequelize.define('Task',{
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
         handymanId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Handymans', // Correct the table name to match your schema
                key: 'id',
            },
        },
        taskOrder:{
            type:DataTypes.INTEGER,
            defaultValue:1,
        },
        clientId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users', // Correct the table name to match your schema
                key: 'id',
            },
        },
        status:{
            type:DataTypes.STRING,
            defaultValue:'pending'
        },
        schdualedAt:{
            type:DataTypes.BIGINT,
        },
        onTime: {
            type: DataTypes.BOOLEAN, // true or false
            allowNull: true,
        },
        costEstimate: {
            type: DataTypes.JSONB, // JSON object
            allowNull: true,
        },
        reviewOfHandyman: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        reviewOfClient: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    });
    return model;
};

module.exports=task;

