require('dotenv').config();
const {user,handymen,company}=require('../auth/authModels')
const employee=require('./employees');
const experty=require('./experties');
const task=require('./task');
const message=require('./messaging/message');
const inboxParticipants=require('./messaging/inbox_participants');
const inbox=require('./messaging/inbox');
const review=require('./review');
const experties_handyman=require('./experties_handyman');
const { Sequelize, DataTypes } = require('sequelize');



const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DBURL;

const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
} : {};



const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);

const expertise_handymanModel=experties_handyman(sequelize,DataTypes);
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


// expertyModel.belongsToMany(handymenModel, { through: 'expertise_handyman',as:'ExpertyId'});
// handymenModel.belongsToMany(expertyModel, { through: 'expertise_handyman',as:'HandymanId'});



// expertyModel.belongsToMany(companyModel, { through: 'expertise_company' });
// companyModel.belongsToMany(expertyModel, { through: 'expertise_company' });



companyModel.hasMany(employeeModel);




employeeModel.belongsTo(companyModel);  // Changing hasOne to belongsTo for clarity


// expertyModel.belongsToMany(handymenModel,{through:'experties_handymen'});
// handymenModel.belongsToMany(expertyModel,{through:'experties_handymen'});
// companyModel.hasMany(employeeModel);
// employeeModel.hasOne(companyModel);
// handymenModel.hasMany(taskModel);
// taskModel.hasOne(handymenModel);
// messagin

// relations for messages model
userModel.hasMany(inboxModel,{as:'UserId',foreignKey:'UserId'});
inboxModel.belongsTo(userModel);
handymenModel.hasMany(inboxModel,{as:'HandymanId',foreignKey:'HandymanId'});
handymenModel.belongsTo(inboxModel);
inboxModel.hasMany(messageModel);
messageModel.belongsTo(inboxModel)
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
// companyModel.hasMany(taskModel, { foreignKey: 'companyId' });


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
    reviewModel,
    expertise_handymanModel
};