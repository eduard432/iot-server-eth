import mongoose from 'mongoose';

const dbConnection = async () => {
	try {
		await mongoose.createConnection(process.env.MONGODB_CNN, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log('Database is connected');
	} catch (err) {
		console.log(err);
		console.log('Error connecting to database');
	}
};

export default dbConnection;
