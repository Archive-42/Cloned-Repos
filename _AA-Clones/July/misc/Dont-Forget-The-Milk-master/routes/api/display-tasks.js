const express = require('express');
const db = require('../../db/models');
const {asyncHandler} = require('../utils')
const { Task, List } = db
const router = express.Router();
const taskNotFoundError = (id) => {
  const err = Error("Task not found");
  err.errors = [`Task with id of ${id} could not be found.`];
  err.title = "Task not found.";
  err.status = 404;
  return err;
};
// /api/tasks/ return all tasks
router.get('/', asyncHandler(async (req, res) => {
  const tasks = await Task.findAll({

  })
  res.json({tasks})
}))
// /api/tasks/1 returns info on tasks with the id 1
router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
  const taskId = req.params.id
  const tasks = await Task.findOne({
    where: {
      id: taskId,
    },
    include: List
  })
  if(tasks) {
    res.json({tasks})
  } else {
    next(taskNotFoundError(taskId))
  }
}))


router.post('/:id/tasks/create-task', asyncHandler( async (req, res) => {

  const { newTask, listId } = req.body;
  const task = await Task.create({
    taskName: newTask,
    listId: listId
  })
  console.log(task)
  res.json({ task })
}))

router.put('/:id/update-task', asyncHandler( async (req, res) => {

  const {taskName, dueDate, description, status, taskId} = req.body;
  console.log(req.body)
  const task = await Task.findOne({
    where: {
      id: Number(taskId)
    }
  });

  if(dueDate === '') {

    await task.update({
        taskName: taskName,
        dueDate: null,
        description: description,
        isComplete: status,
        where: {id: taskId}
      });
      console.log(task)
      res.json({ task })
  } else{
    await task.update({
      taskName: taskName,
      dueDate: dueDate,
      description: description,
      isComplete: status,
      where: {id: taskId}
    });
    console.log(task)
    res.json({ task })
  }
}));

router.get('/:id/get-task', asyncHandler(async (req, res) => {
  const taskId = parseInt(req.params.id, 10)
  const task = await Task.findByPk(taskId)
  res.json({task})
}))


router.put('/:id/update-task-name', asyncHandler(async (req, res) => {
  const { taskName, taskId } = req.body;
  console.log(req.body)
  const task = await Task.findOne({
    where: {
      id: Number(taskId)
    }
  });

    await task.update({
      taskName: taskName,
      where: { id: taskId }
    });
    console.log(task)
    res.json({ task })

}));



module.exports = router;
