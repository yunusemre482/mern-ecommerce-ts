import cors from 'cors';
import { Express } from 'express';
const initCORS = (app: Express) => {
	app.use(
		cors({
			origin: [
				`https://${process.env.HOST}`,
				`http://${process.env.HOST}`,
				`${process.env.HOST}`,
				'http://localhost:3000',
			],
			methods: ['GET', 'POST', 'PUT', 'OPTIONS', 'DELETE'],
			credentials: true, // enable set cookie
		})
	);
};
export default initCORS;
