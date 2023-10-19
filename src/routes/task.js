const router = require("express").Router();
const {
  taskModel,
  handymenModel,
  userModel,
  expertise_handymanModel,
  companyModel,
} = require("../models");
const barer = require("../auth/authMiddlewares/barer");

router.get("/expertiesHandyman", async (req, res) => {
  console.log(expertise_handymanModel);
  const all = await expertise_handymanModel.findAll({});
  res.send(all);
});
router.post("/tasks", async (req, res, next) => {
  try {
    const taskInfo = req.body;
    const createdTask = await taskModel.create(taskInfo);
    res.send(createdTask);
  } catch (e) {
    console.error("Error creating task:", e);
    next(e);
  }
});
// Route: /handymen/:handymanId/tasks
router.get(
  "/handytasks/:handymanId",

  async (req, res, next) => {
    const { handymanId } = req.params;

    try {
      const tasksForHandyman = await taskModel.findAll({
        where: { handymanId: handymanId },
      });

      res.json(tasksForHandyman);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.get(
  "/companytasks/:companyId",
  barer(companyModel),
  async (req, res, next) => {
    const { companyId } = req.params;

    try {
      const tasksForHandyman = await taskModel.findAll({
        where: { companyId: companyId },
      });

      res.json(tasksForHandyman);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.get("/clienttasks/:clientId", async (req, res, next) => {
  const { clientId } = req.params;

  try {
    const tasksForHandyman = await taskModel.findAll({
      where: { clientId: clientId },
    });

    res.json(tasksForHandyman);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});


router.get("/task/:taskId", async (req, res, next) => {
  const { taskId } = req.params;

  try {
    const tasksId = await taskModel.findAll({
      where: { id: taskId },
    });

    res.json(tasksId);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});


// posting task by the client
// input :

// posting task by the client
// input :

router.get("/tasks/all", async (req, res, next) => {
  try {
    const tasks = await taskModel.findAll({});
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error: " + err.message);
  }
});

router.patch("/taskshandy/:taskId", async (req, res, next) => {
  const taskId = req.params.taskId;
  const { schdualedAt, onTime, details, reviewOfClient,taskStatus } = req.body;
  try {
    const task = await taskModel.findByPk(taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    if (Number.isInteger(schdualedAt)) {
      task.schdualedAt = schdualedAt;
      task.taskStatus= taskStatus
    }

    // Update the fields if provided in the request body
    if (typeof onTime === "boolean") {
      task.onTime = onTime;
    }
    if (details && typeof details === "object") {
      task.details = details;
    }

    if (Number.isInteger(reviewOfClient)) {
      task.reviewOfClient = reviewOfClient;
    }


    console.log(task)
    // Save the updated task
    await task.save();

    return res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    next(error);
  }
});

router.patch("/taskscompany/:taskId", async (req, res, next) => {
  const taskId = req.params.taskId;
  const { onTime, details, schdualedAt, reviewOfClient } = req.body;

  try {
    const task = await taskModel.findByPk(taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Update the fields if provided in the request body

    if (typeof onTime === "boolean") {
      task.onTime = onTime;
    }
    if (details && typeof details === "object") {
      task.details = details;
    }
    if (Number.isInteger(schdualedAt)) {
      task.schdualedAt = schdualedAt;
    }

    if (Number.isInteger(reviewOfClient)) {
      task.reviewOfClient = reviewOfClient;
    }

    // Save the updated task
    await task.save();

    return res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    next(error);
  }
});

router.patch("/taskclient/:taskId", async (req, res, next) => {
  const taskId = req.params.taskId;
  const { reviewOfHandyman, choice } = req.body;

  try {
    const task = await taskModel.findByPk(taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Update the fields if provided in the request body

    if (typeof choice === "boolean") {
      task.choice = choice;
    }

    if (Number.isInteger(reviewOfHandyman)) {
      task.reviewOfHandyman = reviewOfHandyman;
    }

    // Save the updated task
    await task.save();

    return res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
