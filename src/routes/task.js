const router=require('express').Router();
const {task} =require('../models');
router.get('/tasks',async(req,res,next)=>{
    const handymanId=req.params.handymanId;
    const allTasks=await task.findAll();
    res.send(allTasks);
});
router.post('/tasks',async (req,res,next)=>{
    try{
        const taskInfo=req.body;
        const createdTask=await task.create(taskInfo);
        res.send(createdTask);
    }catch(e){
        next(e);
    }
   
})
module.exports=router;