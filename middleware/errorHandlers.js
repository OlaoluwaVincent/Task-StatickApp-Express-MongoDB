const { CustomAPIError } = require('../errors/custorm-errors');

// This function handles errors in the application.
// It takes 4 parameters: err - the error object, req - the request object, res - the response object, and next - the next middleware.
const errorHandler = (err, req, res, next) => {
	// Sends an HTTP response to the client with the error status and message.
	if (err instanceof CustomAPIError) {
		return res.status(err.statusCode).json({ message: err.message });
	} else {
		return res.status(500).json({ message: 'Invalid request' });
	}
};

// Exports the errorHandler function so that it can be used in other parts of the application.
module.exports = errorHandler;
