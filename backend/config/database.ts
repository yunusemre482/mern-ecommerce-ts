import Mongoose from 'mongoose';

let database: Mongoose.Connection;

export const connect = () => {
	const DB_URL: string = process.env.MONGO_URI || '';
	console.log('from connect: process.env.MONGO_CONNECTION_STRING :::', process.env.MONGO_URI);

	if (database) {
		return;
	}

	Mongoose.connect(DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	});

	database = Mongoose.connection;

	database.once('open', async () => {
		console.log('Connected to database');
	});

	database.on('error', () => {
		console.log('Error connecting to database');
	});
};

export const disconnect = () => {
	if (!database) {
		return;
	}

	Mongoose.disconnect();

	database.once('close', async () => {
		console.log('Diconnected  to database');
	});
};
