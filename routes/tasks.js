const express = require('express');
const router = express.Router();
const {
	getTasks,
	createTask,
	getTask,
	updateTask,
	deleteTask,
} = require('../controllers/tasks');

// '/api/v1/tasks'
// @get and @post route =>('tasks')

router.route('/tasks').get(getTasks).post(createTask);

// '/api/v1/task/:id
// @get, patch and delete

router.route('/task/:id').get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
