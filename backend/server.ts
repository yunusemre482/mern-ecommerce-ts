import express from 'express';
import bodyParser from 'body-parser';
import dotnev from 'dotenv';
import passport from 'passport';
import path from 'path';
import helmet from 'helmet';
import session from 'express-session';
import morganBody from 'morgan-body';
// configure environment variables
dotnev.config();

import { connect } from './config/database';
import initPassport from './config/passport';
import initCORS from './utils/initCors';
import configureRoutes from './routes';

const { NODE_ENV = 'development', API_PREFIX = '/api/v1', ACCESS_TOKEN_SECRET = '' } = process.env;

const app = express();
app.set('trust proxy', 1); // trust first proxy
app.use(
	session({
		secret: ACCESS_TOKEN_SECRET,
		resave: false,
		saveUninitialized: true,
		cookie: { secure: true },
	})
);

// Connect to database
connect();

// Init CORS
initCORS(app);

// Init Helmet
app.use(helmet());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '3mb', extended: false }));

// parse application/json
app.use(bodyParser.json({ limit: '3mb' }));

// parse requests of content-type - application/json
app.use(express.json());
morganBody(app);

// Passport Config
app.use(passport.initialize());
app.use(passport.session());
initPassport();

// Configure Routes
app.use('/public', express.static('public'));
app.use(API_PREFIX, configureRoutes(app));

// send react files on production
if (NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}



app.listen(process.env.PORT, () => {
	console.log(`Server running on port ${process.env.PORT}`);
});
