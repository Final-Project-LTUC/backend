const router=require('express').Router();
const {task, taskModel} =require('../models');

router.get('/tasks/:handymanId',async(req,res,next)=>{
    const handymanId=req.params.handymanId;
    const allTasks=await task.findAll({where:handymanId});
    res.send(allTasks);
});
router.patch('/tasks/:taskId',async(req,res,next)=>{
    const handymanId=req.params.handymanId;
    const taskInfo=req.body;
    try {
        const review = await taskModel.find({where:handymanId});
    } catch (e) {
        
    }
});
router.post('/tasks/:handymanId',async (req,res,next)=>{
    try{
        const handymanId=req.params.handymanId;
        const taskInfo=req.body;
        const createdTask=await taskModel.create(taskInfo,{where:{handymanId:handymanId}});
        res.send(createdTask);
    }catch(e){
        next(e);
    }   
})
module.exports=router;