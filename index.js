const express = require('express');
const app = express();
const tasksRoutes = require('./routes/tasks');

const connectDB = require('./db/connect');
const notFound = require('./middleware/notfound');
const errorHandler = require('./middleware/errorHandlers');
const port = process.env.PORT || 9001;

// Middlewares
app.use(express.static('public'));
app.use(express.json());

//Route Middlewares

app.get('/', (req, res) => {
	res.sendFile(index.html, { root: path.join(__dirname, 'public') });
});

app.use('/api/v1', tasksRoutes);

app.use(notFound);
app.use(errorHandler);

// This means that the server will only be served after the database connects successfully.
const start = async () => {
	try {
		await connectDB();
		app.listen(port, console.log(`Listening on port: ${port}...`));
	} catch (error) {
		console.log(error);
	}
};

start();
module.exports = app;
