const express = require('express');
const router = express.Router();
const Task = require('../../models/Task');

/* GET form page */
router.get('/form', (req, res, next) => {
  res.render('form-views/form');
});

//Post form page
router.post('/form-input', (req, res, next) => {
  console.log('the form info: ', req.body);

  Task.create(req.body)
    .then(tasksFromDB => {
      // console.log('Created new Task', tasksFromDB);
      res.redirect(`/task-details/${tasksFromDB._id}`);
    })
    .catch(err => next(err));

  //or
  // res.redirect('/form');
});

router.get('/task-list', (req, res, next) => {
  Task.find().then(tasksFromDB => {
    // console.log(' tasksFromDB', tasksFromDB);
    // const data = {task: tasksFromDB}
    res.render('task-views/task-list', {
      pageTitle: 'Task List',
      tasks: tasksFromDB,
    });
  });
});

router.get('/task-details/:taskId', (req, res, next) => {
  Task.findById(req.params.taskId)
    .then(taskFromDB => {
      res.render('task-views/task-details', {
        task: taskFromDB,
        pageTitle: taskFromDB.title + 'Details',
      });
    })
    .catch(err => next(err));
});

module.exports = router;
