const express = require('express');
const db = require('../../db/models');
const {asyncHandler} = require('../utils')
const { Task } = db
const router = express.Router();


// delete task and update the database

router.delete('/:id/tasks/delete-task', asyncHandler(async (req, res) => {

  const {taskId} = req.body;
  console.log('req.body:', req.body)
  console.log('taskId:', taskId)
  const deletedTask = await Task.destroy({
    where: {
      id: Number(taskId) }
  })

  res.json({deletedTask: taskId})
}))



module.exports = router;
