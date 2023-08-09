'use strict';


const router = require('express').Router();
const {taskModel} = require('../models');






router.get('/tasks',async(req,res,next)=>{
    const handymanId=req.params.handymanId;
    const allTasks = await taskModel.findAll();
    res.send(allTasks);
});

router.post('/tasks',async (req,res,next)=>{
    try{
        const handymanId=req.params.handymanId;
        const taskInfo=req.body;
        const createdTask = await taskModel.create(taskInfo);
        res.send(createdTask);
    }catch(e){
        next(e);
    }   
})
module.exports=router;