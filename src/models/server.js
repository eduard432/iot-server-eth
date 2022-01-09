import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

import dbConnection from '../database/config.js';
import { userRoutes, dashboardRoutes, widgetRoutes } from '../routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT || 8080;
	}

	middlewares() {
		this.app.use(express.static(path.resolve(__dirname, '../../public')));

		this.app.use(cors());
		this.app.use(morgan('dev'));
		this.app.use(express.json());

		const secret = process.env.SESSION_SECRET;
		const mongoUrl = process.env.MONGODB_CNN;

		const sessionStore = MongoStore.create({
			mongoUrl,
			collection: 'sessions',
		});

		this.app.use(
			session({
				secret,
				resave: false,
				saveUninitialized: true,
				store: sessionStore,
				cookie: {
					maxAge: 1000 * 60 * 60 * 24,
				},
			})
		);
	}

	routes() {
		this.app.use('/api/auth', userRoutes);
		this.app.use('/api/dashboard', dashboardRoutes);
		this.app.use('/api/widget', widgetRoutes);

		this.app.use('/*', (req, res) => {
			res.sendFile(path.join(__dirname, '../public', 'index.html'));
		});
	}

	listen() {
		this.middlewares();
		this.routes();

		this.app.listen(this.port, () => {
			console.log(`Server running on port ${this.port}`);
		});

		dbConnection();
	}
}
