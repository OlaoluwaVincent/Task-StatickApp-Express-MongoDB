// Extend from error class

class CustomAPIError extends Error {
	// Constructor for CustomAPIError class, takes a message and a status code
	constructor(message, statusCode) {
		// Call the constructor of the Error class with the message argument
		super(message);
		// Assign the status code to the statusCode property of the instance
		this.statusCode = statusCode;
	}
}

// Function to create a new instance of CustomAPIError with a specific message and status code
const createCustomError = (message, statusCode) => {
	// Create a new instance of CustomAPIError with the provided message and status code
	return new CustomAPIError(message, statusCode);
};

module.exports = { createCustomError, CustomAPIError };
