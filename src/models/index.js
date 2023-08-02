require('dotenv').config();
const userModel=require('../auth/authModels/users');
const handymenModel=require('../auth/authModels/handymen');
const expertiesModel=require('./experties');
const { Sequelize, DataTypes } = require('sequelize');

const DATABASE_URL = process.env.DBURL || 'sqlite:memory;';
const sequelize= new Sequelize(DATABASE_URL);
const handymen=userModel(sequelize,DataTypes);
const users=userModel(sequelize,DataTypes);
const experties=expertiesModel(sequelize,DataTypes);
// experties.hasMany(handymen,'experties_handymen');
// handymen.hasMany(experties,'experties_handymen');

module.exports={
    db:sequelize,
    users,
    // handymen,
    // experties,
};