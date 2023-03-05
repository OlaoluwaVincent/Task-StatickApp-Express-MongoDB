// Define an asynchronous function called asyncWrapper that takes in another function called func as an argument
const asyncWrapper = (func) => {
	// Return an asynchronous function that takes in the standard Express.js middleware arguments: req, res, and next
	return async (req, res, next) => {
		// Wrap the original function in a try-catch block to catch any errors
		try {
			// Call the original function with the req, res, and next arguments using the await keyword to wait for the function to complete
			await func(req, res, next);
		} catch (error) {
			// If the original function throws an error, call the next function with the error argument to pass the error to the next middleware or error handler in the chain
			next(error);
		}
	};
};

// Export the asyncWrapper function so that it can be used in other modules
module.exports = asyncWrapper;
