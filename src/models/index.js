require('dotenv').config();
const {user,handymen,company}=require('../auth/authModels')
const employee=require('./employees');
const experty=require('./experties');
const task=require('./task');
const message=require('./messaging/message');
const inboxParticipants=require('./messaging/inbox_participants');
const inbox=require('./messaging/inbox');
const { Sequelize, DataTypes } = require('sequelize');
const DATABASE_URL = process.env.DBURL || 'sqlite:memory;';
const sequelize= new Sequelize(DATABASE_URL);
const handymenModel=handymen(sequelize,DataTypes);
const userModel=user(sequelize,DataTypes);
const expertyModel=experty(sequelize,DataTypes);
const companyModel=company(sequelize,DataTypes);
const employeeModel=employee(sequelize,DataTypes);
const taskModel=task(sequelize,DataTypes);
const messageModel=message(sequelize,DataTypes);
const inboxModel=inbox(sequelize,DataTypes);
const inboxParticipantsModel=inboxParticipants(sequelize,DataTypes);
expertyModel.belongsToMany(handymenModel,{through:'experties_handymen'});
handymenModel.belongsToMany(expertyModel,{through:'experties_handymen'});
companyModel.hasMany(employeeModel);
employeeModel.hasOne(companyModel);
handymenModel.hasMany(taskModel);
taskModel.hasOne(handymenModel);
userModel.belongsToMany(inboxModel,{through:inboxParticipantsModel,as:'user1_id'});
userModel.belongsToMany(inboxModel,{through:inboxParticipantsModel,as:'user2_id'});
inboxParticipantsModel.hasOne(inboxModel);
inboxModel.belongsTo(inboxParticipantsModel);
messageModel.hasOne(inboxModel);
inboxModel.belongsTo(messageModel);
messageModel.hasOne(userModel);
userModel.belongsTo(messageModel);


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
};