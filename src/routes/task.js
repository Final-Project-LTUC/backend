
const router=require('express').Router();
const {task, taskModel} =require('../models');
const bearer = require('../auth/authMiddlewares/barer')

router.get('/tasks/:handymanId',bearer,async(req,res,next)=>{ 
     //handyman and company
     console.log('data::::::::::::::',req.user)
    const handymanId=req.params.handymanId;
    const allTasks=await taskModel.findByPk(handymanId);
    res.send(allTasks);
    
});
router.patch('/tasks/:taskId',bearer,async(req,res,next)=>{
    const handymanId=req.params.handymanId;
    const taskInfo=req.body;
    try {
        const review = await taskModel.find({where:handymanId});
    } catch (e) {
        
    }
});
router.post('/tasks/:handymanId',bearer,async (req,res,next)=>{ // user

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