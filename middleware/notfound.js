// This function is used to handle HTTP requests for undefined routes.
// It takes 2 parameters: req - the request object, and res - the response object.
const notFound = (req, res) => res.status(404).send('Route does not exist');

// Exports the notFound function so that it can be used in other parts of the application.
module.exports = notFound;
