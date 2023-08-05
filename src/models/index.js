require('dotenv').config();
const {user,handymen,company}=require('../auth/authModels')
const employee=require('./employees');
const experty=require('./experties');
const task=require('./task');
const { Sequelize, DataTypes } = require('sequelize');
const DATABASE_URL = process.env.DBURL || 'sqlite:memory;';
const sequelize= new Sequelize(DATABASE_URL);
const handymenModel=handymen(sequelize,DataTypes);
const userModel=user(sequelize,DataTypes);
const expertyModel=experty(sequelize,DataTypes);
const companyModel=company(sequelize,DataTypes);
const employeeModel=employee(sequelize,DataTypes);
const taskModel=task(sequelize,DataTypes);
expertyModel.belongsToMany(handymenModel,{through:'experties_handymen'});
handymenModel.belongsToMany(expertyModel,{through:'experties_handymen'});
companyModel.hasMany(employeeModel);
employeeModel.hasOne(companyModel);
handymenModel.hasMany(taskModel);
taskModel.hasOne(handymenModel);
module.exports={
    db:sequelize,
    userModel,
    employeeModel,
    handymenModel,
    expertyModel,
    taskModel,
    companyModel,
    expertyModel,
};