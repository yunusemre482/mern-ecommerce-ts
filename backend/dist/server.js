"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const passport_1 = __importDefault(require("passport"));
const path_1 = __importDefault(require("path"));
const helmet_1 = __importDefault(require("helmet"));
const express_session_1 = __importDefault(require("express-session"));
const morgan_body_1 = __importDefault(require("morgan-body"));
// configure environment variables
dotenv_1.default.config();
const database_1 = require("./config/database");
const passport_2 = __importDefault(require("./config/passport"));
const initCors_1 = __importDefault(require("./utils/initCors"));
const routes_1 = __importDefault(require("./routes"));
const { NODE_ENV = 'development', API_PREFIX = '/api/v1', ACCESS_TOKEN_SECRET = '' } = process.env;
const app = (0, express_1.default)();
app.set('trust proxy', 1); // trust first proxy
app.use((0, express_session_1.default)({
    secret: ACCESS_TOKEN_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
}));
// Connect to database
(0, database_1.connect)();
// Init CORS
(0, initCors_1.default)(app);
// Init Helmet
app.use((0, helmet_1.default)());
// parse application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded({ limit: '3mb', extended: false }));
// parse application/json
app.use(body_parser_1.default.json({ limit: '3mb' }));
// parse requests of content-type - application/json
app.use(express_1.default.json());
(0, morgan_body_1.default)(app);
// Passport Config
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
(0, passport_2.default)();
// Configure Routes
app.use('/public', express_1.default.static('public'));
app.use(API_PREFIX, (0, routes_1.default)(app));
// send react files on production
if (NODE_ENV === 'production') {
    app.use(express_1.default.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path_1.default.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
