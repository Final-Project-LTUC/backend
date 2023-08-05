const router=require('express').Router();
const {userModel,employeeModel,companyModel,expertyModel,taskModel,}=require('../models');
const {  fakeUsers,
    fakeExperties,
    fakeHandymen,
    fakeEmployees,
    fakeCompanies,
    fakeTasks}=require('../../constants');
const { async } = require('q');
const models = require('../models');
router.get('/seed',(req,res,next)=>{
fakeUsers.forEach(async(e)=>{
    await userModel.create(e);
});
fakeCompanies.forEach(async(e)=>{
    await companyModel.create(e)
});
fakeHandymen.forEach(async (e)=>{
    await companyModel.create(e);
});
fakeEmployees.forEach(async(e=>{
    employeeModel.create(e);
}));
fakeExperties.forEach(async(e)=>{
    await expertyModel.create(e);
});
fakeTasks.forEach(async(e)=>{
    await taskModel.create(e);
});
res.send('all data have been added succifully ');
});
module.exports=router;