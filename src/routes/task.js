
const router=require('express').Router();
const {task, taskModel, handymenModel} =require('../models');
const bearer = require('../auth/authMiddlewares/barer');
const barer = require('../auth/authMiddlewares/barer');
const acl = require('../auth/authMiddlewares/acl');

// Route: /handymen/:handymanId/tasks
router.get('/handytasks/:handymanId', barer(handymenModel),acl('handyman'),async (req, res, next) => {
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


router.get('/:clientId/companytasks', async (req, res, next) => {
    const { companyId } = req.params;

    try {
        const tasksForHandyman = await taskModel.findAll({
            where: { companyId: companyId },
        });

        res.json(tasksForHandyman);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
router.get('/:clientId/clienttasks', async (req, res, next) => {
    const { clientId } = req.params;

    try {
        const tasksForHandyman = await taskModel.findAll({
            where: { clientId: clientId },
        });

        res.json(tasksForHandyman);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


// posting task by the client
// input :


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


router.patch('/taskshandy/:taskId', async (req, res, next) => {
    const taskId = req.params.taskId;
    const {
        onTime,
        costEstimate,
     
        reviewOfClient
    } = req.body;

    try {
        const task = await taskModel.findByPk(taskId);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Update the fields if provided in the request body
        if (typeof onTime === 'boolean') {
            task.onTime = onTime;
        }
        if (costEstimate && typeof costEstimate === 'object') {
            task.costEstimate = costEstimate;
        }
      
        if (Number.isInteger(reviewOfClient)) {
            task.reviewOfClient = reviewOfClient;
        }

        // Save the updated task
        await task.save();

        return res.status(200).json({ message: 'Task updated successfully', task });
    } catch (error) {
        next(error);
    }
});

router.patch('/taskclient/:taskId', async (req, res, next) => {
    const taskId = req.params.taskId;
    const {
        onTime,
        costEstimate,
        reviewOfHandyman,
        choice
       
    } = req.body;

    try {
        const task = await taskModel.findByPk(taskId);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Update the fields if provided in the request body
        if (typeof onTime === 'boolean') {
            task.onTime = onTime;
        }
        if (typeof choice === 'boolean') {
            task.choice = choice;
        }
        if (costEstimate && typeof costEstimate === 'object') {
            task.costEstimate = costEstimate;
        }
        if (Number.isInteger(reviewOfHandyman)) {
            task.reviewOfHandyman = reviewOfHandyman;
        }
     

        // Save the updated task
        await task.save();

        return res.status(200).json({ message: 'Task updated successfully', task });
    } catch (error) {
        next(error);
    }
});







// posting task by the client
// input :


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