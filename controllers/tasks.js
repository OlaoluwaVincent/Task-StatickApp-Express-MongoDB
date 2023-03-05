const TaskModel = require('../models/tasks');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custorm-errors');

// Controllers

// Define an asynchronous function called getTasks that uses the asyncWrapper middleware to catch any errors that might be thrown in the task retrieval process
const getTasks = asyncWrapper(async (req, res) => {
	// Find all tasks in the TaskModel collection
	const tasks = await TaskModel.find({});
	// Respond with a status of 200 and the tasks in JSON format
	res.status(200).json({ tasks });
});

// Define an asynchronous function called createTask that uses the asyncWrapper middleware to catch any errors that might be thrown in the task creation process
const createTask = asyncWrapper(async (req, res) => {
	// Create a new task in the TaskModel collection using the request body as the task data
	const task = await TaskModel.create(req.body);
	// Respond with a status of 201 and the created task in JSON format
	res.status(201).json({ task });
});

// Define an asynchronous function called getTask that uses the asyncWrapper middleware to catch any errors that might be thrown in the task retrieval process
const getTask = asyncWrapper(async (req, res, next) => {
	// Find a single task in the TaskModel collection by the task's ID
	const singleTask = await TaskModel.findOne({ _id: req.params.id });
	// If the task is not found, respond with a 404 error and a message indicating that the task was not found
	if (!singleTask) {
		return next(
			createCustomError(`No task with the ID: ${req.params.id}`, 404)
		);
	}
	// If the task is found, respond with a status of 200 and the task in JSON format
	res.status(200).json({ task: singleTask });
});

// Define an asynchronous function called deleteTask that uses the asyncWrapper middleware to catch any errors that might be thrown in the task deletion process
const deleteTask = asyncWrapper(async (req, res, next) => {
	// Find and delete a task in the TaskModel collection by the task's ID
	const deletedTask = await TaskModel.findByIdAndDelete(req.params.id);
	// If the task is not found, respond with a 404 error and a message indicating that the task was not found
	if (!deletedTask) {
		return next(
			createCustomError(`No task with the ID: ${req.params.id}`, 404)
		);
	}
	// If the task is found and deleted, respond with a status of 200 and a message indicating that the task was deleted successfully
	res.status(200).send('Deleted Successfully');
});

// Define an asynchronous function called updateTask that uses the asyncWrapper middleware to catch any errors that might be thrown in the task update process
const updateTask = asyncWrapper(async (req, res, next) => {
	// Get the ID of the task to be updated from the request parameters
	const { id } = req.params;
	// Find and update the task in the TaskModel collection with the data from the request body
	const updatedTask = await TaskModel.findOneAndUpdate(
		{ _id: id },
		req.body,
		{ new: true, runValidators: true }
	);
	// If the task is not found, respond with a 404 error and a message indicating that the task was not found
	if (!updatedTask) {
		return next(
			createCustomError(`No task with the ID: ${req.params.id}`, 404)
		);
	}
	// If the task is found and updated, respond with
	res.status(200).json({ task: updatedTask });
});

module.exports = {
	getTasks,
	createTask,
	getTask,
	updateTask,
	deleteTask,
};
