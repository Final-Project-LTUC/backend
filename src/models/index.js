require('dotenv').config();
const {user,handymen,company}=require('../auth/authModels')
const employee=require('./employees');
const experty=require('./experties');
const task=require('./task');
const message=require('./messaging/message');
const inboxParticipants=require('./messaging/inbox_participants');
const inbox=require('./messaging/inbox');
const review=require('./review');
const { Sequelize, DataTypes } = require('sequelize');
const DATABASE_URL = process.env.DBURL || 'sqlite:memory;';
const sequelize= new Sequelize(DATABASE_URL);
const handymenModel=handymen(sequelize,DataTypes);
const userModel=user(sequelize,DataTypes);
const expertyModel=experty(sequelize,DataTypes);
const companyModel=company(sequelize,DataTypes);
const employeeModel=employee(sequelize,DataTypes);
const reviewModel=review(sequelize,DataTypes);
const taskModel=task(sequelize,DataTypes);
const messageModel=message(sequelize,DataTypes);
const inboxModel=inbox(sequelize,DataTypes);
const inboxParticipantsModel=inboxParticipants(sequelize,DataTypes);


expertyModel.belongsToMany(handymenModel, { through: 'expertise_handymen' });
handymenModel.belongsToMany(expertyModel, { through: 'expertise_handymen' });
companyModel.hasMany(employeeModel);
employeeModel.belongsTo(companyModel);  // Changing hasOne to belongsTo for clarity


// expertyModel.belongsToMany(handymenModel,{through:'experties_handymen'});
// handymenModel.belongsToMany(expertyModel,{through:'experties_handymen'});
// companyModel.hasMany(employeeModel);
// employeeModel.hasOne(companyModel);
// handymenModel.hasMany(taskModel);
// taskModel.hasOne(handymenModel);
// messagin


userModel.belongsToMany(inboxModel,{through:inboxParticipantsModel,as:'user1_id'});
userModel.belongsToMany(inboxModel,{through:inboxParticipantsModel,as:'user2_id'});
inboxParticipantsModel.hasOne(inboxModel);
inboxModel.belongsTo(inboxParticipantsModel);
messageModel.hasOne(inboxModel);
inboxModel.belongsTo(messageModel);
messageModel.hasOne(userModel);
userModel.belongsTo(messageModel);

// relations for review model
taskModel.hasOne(reviewModel);
reviewModel.belongsTo(taskModel);
userModel.hasMany(reviewModel);
handymenModel.hasMany(reviewModel);
reviewModel.belongsTo(userModel);
reviewModel.belongsTo(handymenModel);

// task relation to client and handy

// relations for user,handyman and comapnies to   tasks
userModel.hasMany(taskModel, { foreignKey: 'clientId' });
handymenModel.hasMany(taskModel, { foreignKey: 'handymanId' });
companyModel.hasMany(taskModel, { foreignKey: 'companyId' });


taskModel.belongsTo(userModel, { foreignKey: 'clientId' });
taskModel.belongsTo(handymenModel, { foreignKey: 'handymanId' });
// taskModel.belongsTo(companyModel, { foreignKey: 'companyId' });


// userModel.hasMany(taskModel, {foreignKey: 'clientId', sourceKey: 'id'})
// handymenModel.hasMany(taskModel, {foreignKey: 'handymanId', sourceKey: 'id'})

// targetKey -> the target model PK


// taskModel.belongsTo(userModel, { foreignKey: 'clientId' , targetKey: 'id'});
// taskModel.belongsTo(handymenModel, { foreignKey: 'handymanId' , targetKey: 'id'});




module.exports={
    db:sequelize,
    userModel,
    employeeModel,
    handymenModel,
    expertyModel,
    taskModel,
    companyModel,
    expertyModel,
    messageModel,
    inboxModel,
    inboxParticipantsModel,
    reviewModel
};