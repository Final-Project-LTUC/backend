require("dotenv").config();

const userModel = require("../auth/authModels/users");
const handymenModel = require("../auth/authModels/handymen");
const companiesModel = require("../auth/authModels/companies");
const employeesModel = require("./employees");
const expertiesModel = require("./experties");
const { Sequelize, DataTypes } = require("sequelize");
const secret = process.env.SECRET;
const DATABASE_URL = process.env.DBURL || "sqlite:memory;";
const sequelize = new Sequelize(DATABASE_URL);

const handymen = handymenModel(sequelize, DataTypes);
const users = userModel(sequelize, DataTypes, secret);
const experties = expertiesModel(sequelize, DataTypes);
const companies = companiesModel(sequelize, DataTypes);
const employees = employeesModel(sequelize, DataTypes);

experties.belongsToMany(handymen, { through: "experties_handymen" });
handymen.belongsToMany(experties, { through: "experties_handymen" });
companies.hasMany(employees);
employees.hasOne(companies);

const models = {
    db: sequelize,
    users,
    handymen,
    experties,
    companies,
    employees,
};

module.exports = models;
