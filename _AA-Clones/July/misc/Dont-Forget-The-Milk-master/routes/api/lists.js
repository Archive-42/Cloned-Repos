const express = require('express');
const {check} = require('express-validator');
const {handleValidationErrors, asyncHandler} = require('../utils');
// const {requireAuth} = require('../../auth');
const router = express.Router();
const db = require('../../db/models');

const { User, List, Task} = db;

const validateList = [
  check('listName')
  .exists({checkFalsy: true})
  .withMessage("List name can't be undefined."),
  check('listName')
  .isLength({max: 50})
  .withMessage("List can't be longet than 50 characters."),
  handleValidationErrors,
];


const listNotFoundError = (id) => {
  const err = Error('List not found');
  err.errors = [`List with the id of ${id} could not be found`];
  err.title = 'List not found';
  err.status = 404;
  return err;
};

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
  const listId = req.params.id
  const list = await List.findOne({
    where: {
      id: listId,
    },
    include: [{model:Task, as:"task"}]
  })
  if(list) {
    res.json({list})
  } else {
    next(taskNotFoundError(taskId))
  }
}))

router.put('/:id(\\d+)', asyncHandler(async (req, res, next) => {
  const list = await List.findOne({
    where: {
      id: req.params.id
    },
  });
  // if(req.params.id !== list.userId) {
  //   const err = new Error('Unauthorized');
  //   err.status = 401;
  //   err.message = 'You are not authorized to edit this List';
  //   err.title = 'Unauthorized';
  //   throw err;
  // }
  if (list) {
    await list.update({ listName: req.body.editListName });
    res.json({ list });
  } else {
    next(listNotFoundError(req.params.id));
  }
}));



router.delete('/:id(\\d+)', asyncHandler(async(req,res,next) => {
  const list = await List.findOne({
    where: {
      id: req.params.id
    }
  });

  if(list) {
    await list.destroy();
    res.json({message:`Deleted list with id of ${req.params.id}!`});
  } else {
    next(listNotFoundError(req.params.id));
  }
}));

// /api/lists/listId/tasks will display all tasks for a specific list
router.get('/:listId/tasks', asyncHandler(async (req, res) => {
  let count = 0;
  const listId = req.params.listId
  const allTasks = await Task.findAll({
    where: {
      listId,
    }
  })
  allTasks.forEach(task => {
    if(task.isComplete === true){
      count++
    }
  })
  res.json({allTasks, count})
}))



// create a new task and store it in the database
router.post('/:id/tasks/create-task', asyncHandler( async (req, res) => {

  const { newTask, listId } = req.body;

  const task = await Task.create({
    taskName: newTask,
    listId: listId
  })
  // console.log(task)
  res.json({ task })

}))

router.get('/:id/tasks/completedTasks', asyncHandler(async ( req, res, next) => {
  const listId = req.params.id
  const allTasks = await Task.findAll({
    where: {
      listId: listId
    }
  })

  let completeTasks = []
  // console.log(allLists.task)
  allTasks.forEach(task => {
    if(task.isComplete === true){
      completeTasks.push(task)
    }
  })
  res.json({completeTasks})
}))


router.get('/:id/tasks/incompletedTasks', asyncHandler(async ( req, res, next) => {
  const listId = req.params.id
  const allTasks = await Task.findAll({
    where: {
      listId: listId
    }
  })

  let incompleteTasks = []
  // console.log(allLists.task)
  allTasks.forEach(task => {
    if(task.isComplete === false){
      incompleteTasks.push(task)
    }
  })
  res.json({incompleteTasks})
}))

  module.exports = router;
