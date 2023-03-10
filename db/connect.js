const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set('strictQuery', true);

const connectDB = () => {
	return mongoose
		.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => console.log('Connected to the db...'))
		.catch((err) => console.log(err));
};

module.exports = connectDB;
