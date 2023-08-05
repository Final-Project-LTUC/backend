const router=require('express').Router();
const {task} =require('../models');
router.get('/tasks',async(req,res,next)=>{
    const handymanId=req.params.handymanId;
    const allTasks=task.findAll();
    res.send(allTasks);
}).post('/tasks',async (req,res,next)=>{
    const taskInfo=req.body;
    const createdTask=task.create(taskInfo);
    res.send(createdTask);
})
module.exports=router;