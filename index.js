const express = require('express');
const app = express();
const path = require('path');

const tasksRoutes = require('./routes/tasks');

const connectDB = require('./db/connect');
const notFound = require('./middleware/notfound');
const errorHandler = require('./middleware/errorHandlers');
const port = process.env.PORT || 9001;

// Middlewares
app.use(express.static('public'));
app.use(express.json());

//Route Middlewares

app.get('*', (req, res) => {
	res.sendFile('index.html', { root: __dirname + '/public' });
});

app.use('/api/v1', tasksRoutes);

// Serve front end

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/public')));

	app.get('*', (_, res) => {
		const options = {
			root: path.join(__dirname, '/public'),
			dotfiles: 'allow',
		};
		res.sendFile('index.html', options);
	});
} else {
	// Routes || Endpoint
	app.get('/', (req, res) => {
		res.send('Hello WORLD');
	});
}

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
module.exports = (req, res) => {
	app(req, res);
};
