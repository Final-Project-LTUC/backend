
const router=require('express').Router();
const {task, taskModel} =require('../models');
const bearer = require('../auth/authMiddlewares/barer')

// Route: /handymen/:handymanId/tasks
router.get('/:handymanId/tasks', async (req, res, next) => {
    const { handymanId } = req.params;

    try {
        const tasksForHandyman = await taskModel.findAll({
            where: { handymanId: handymanId },
        });

        res.json(tasksForHandyman);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
// router.get('/tasks/:handymanId',bearer,async(req,res,next)=>{ 
//      //handyman and company
//      console.log('data::::::::::::::',req.user)
//     const handymanId=req.params.handymanId;
//     const allTasks=await taskModel.findByPk(handymanId);
//     res.send(allTasks);
    
// });
router.patch('/tasks/:taskId',bearer,async(req,res,next)=>{
    const handymanId=req.params.handymanId;
    const taskInfo=req.body;
    try {
        const review = await taskModel.find({where:handymanId});
        res.send(review);
    } catch (e) {
        
    }
});

router.post('/tasks', async (req, res, next) => {
    try {
        const taskInfo = req.body;
        const createdTask = await taskModel.create(taskInfo);

        res.send(createdTask);
    } catch (e) {
        console.error("Error creating task:", e);
        next(e);
    }
});

module.exports=router;