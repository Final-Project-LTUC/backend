require('dotenv').config();
const userModel=require('../../models/users');
const handymenModel=require('../../models/handymen');
const expertiesModel=require('../../models/experties');
const { Sequelize, DataTypes } = require('sequelize');

const DATABASE_URL = process.env.DBURL || 'sqlite:memory;';
const sequelize= new Sequelize(DATABASE_URL);
const handymen=handymenModel(sequelize,DataTypes);
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